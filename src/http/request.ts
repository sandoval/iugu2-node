import { JSONDecoder } from './json-decoder'
import { JSONEncoder } from './json-encoder'

import * as http from 'http'
import * as https from 'https'
import * as urlmod from 'url'

export interface Response<T> {
    status: {
        code: number
        message: string
    }
    body: T
}

/**
 * Object returned by Request class when the request fails (status code not between 200 and 299)
 */
export interface Error<T> {
    status?: {
        code: number
        message?: string
    }
    body?: T
    rawBody?: Buffer
    strBody?: string
    error?: any
}

export interface RequestOptions {
    method: string
    url?: string
    headers?: any
}

/**
 * Class used internally for every request
 */
export class Request<InType, OutType> {
    private method: string
    private request: http.ClientRequest
    private headers: any = {
        // Currently this class always use JSON encoder/decoder, so add content-type and accept headers
        'content-type': 'application/json',
        'accept': 'application/json'
    }
    protected url: urlmod.Url

    private encoder = new JSONEncoder<InType>()
    private decoder = new JSONDecoder<OutType>()

    constructor(options: RequestOptions) {
        this.method = options.method

        if (options.headers) {
            this.setHeaders(options.headers)
        }
        if (options.url) {
            this.setUrl(options.url)
        }
    }

    /**
     * Sets the URL for the request.
     *
     * Supported protocols are HTTP and HTTPS.
     */
    public setUrl(url: string) {
        this.url = urlmod.parse(url)

        if (this.url.protocol === 'https:') {
            this.request = this.createHttps(this.url)
        } else {
            this.request = this.createHttp(this.url)
        }
    }

    /**
     * Sets a new HTTP header for the request.
     *
     * If the header was already set, then its value is updated.
     */
    public setHeader(key: string, value: string) {
        key = key.toLocaleLowerCase()

        this.headers[key] = value

        if (this.request) {
            this.request.setHeader(key, value)
        }
    }

    /**
     * Sets new HTTP headers for the request.
     *
     * Internally, it calls {@link XMLClient#setHeader} for each defined key/value pair of the headers parameter
     *
     * @param {Object} headers A table containing the header name as its key, and the header contents as its value.
     */
    public setHeaders(headers: any) {
        for (let i in headers) {
            if (!headers.hasOwnProperty(i)) {
                continue
            }

            this.setHeader(i, headers[i].toString())
        }
    }

    public getHeader(name: string) {
        name = name.toLocaleLowerCase()

        return this.headers[name]
    }

    private createHttp(uri: urlmod.Url): http.ClientRequest {
        let port = Number.parseInt(uri.port || '80')
        let path = uri.pathname || '/'
        let search = uri.search || ''
        return http.request({
                method: this.method,
                headers: this.headers,
                hostname: uri.hostname,
                path: path + search,
                protocol: uri.protocol,
                port: port
            })
    }

    private createHttps(uri: urlmod.Url): http.ClientRequest {
        let port = Number.parseInt(uri.port || '443')
        let path = uri.pathname || '/'
        let search = uri.search || ''

        return https.request({
                method: this.method,
                headers: this.headers,
                hostname: uri.hostname,
                path: path + search,
                protocol: uri.protocol,
                port: port
            })
    }

    /**
     * Begins a request, optionally passing a body to be added
     *
     * If the response status code is not success (< 200 or >= 300), then the promise is rejected
     */
    public begin(body?: InType): Promise<OutType> {
        let rawData = new Buffer(0)

        let promise = new Promise<OutType>((resolve, reject) => {
            this.request.on('response', (response: http.IncomingMessage) => {
                response.on('data', (chunk: Buffer) => {
                    rawData = Buffer.concat([ rawData, chunk ])
                })

                response.on('end', () => {
                    if (response.statusCode) {
                        if (response.statusCode < 200 || response.statusCode > 299) {
                            let errorData: Error<OutType> = {
                                status: {
                                    code: response.statusCode,
                                    message: response.statusMessage
                                },
                                rawBody: rawData,
                                strBody: rawData.toString('utf8')
                            }

                            reject(errorData)
                            return
                        }
                    }

                    try {
                        let jsonResponse = this.decoder.decodeResponse(rawData)
                        resolve(jsonResponse)
                    } catch (e) {
                        let errorData: Error<OutType> = {
                            error: e
                        }
                        reject(errorData)
                    }
                })
            })
            this.request.on('error', error => {
                let errorData: Error<OutType> = {
                    error: error
                }
                reject(errorData)
            })

            if (body) {
                let data = this.encoder.processBody(body)
                let length = data.length
                this.request.setHeader('content-length', length.toFixed(0))
                this.request.write(data)
            }
            this.request.end()
        })

        return promise
    }
}
