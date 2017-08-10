"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_decoder_1 = require("./json-decoder");
const json_encoder_1 = require("./json-encoder");
const http = require("http");
const https = require("https");
const urlmod = require("url");
/**
 * Class used internally for every request
 */
class Request {
    constructor(options) {
        this.headers = {
            // Currently this class always use JSON encoder/decoder, so add content-type and accept headers
            'content-type': 'application/json',
            'accept': 'application/json'
        };
        this.encoder = new json_encoder_1.JSONEncoder();
        this.decoder = new json_decoder_1.JSONDecoder();
        this.method = options.method;
        if (options.headers) {
            this.setHeaders(options.headers);
        }
        if (options.url) {
            this.setUrl(options.url);
        }
    }
    /**
     * Sets the URL for the request.
     *
     * Supported protocols are HTTP and HTTPS.
     */
    setUrl(url) {
        this.url = urlmod.parse(url);
        if (this.url.protocol === 'https:') {
            this.request = this.createHttps(this.url);
        }
        else {
            this.request = this.createHttp(this.url);
        }
    }
    /**
     * Sets a new HTTP header for the request.
     *
     * If the header was already set, then its value is updated.
     */
    setHeader(key, value) {
        key = key.toLocaleLowerCase();
        this.headers[key] = value;
        if (this.request) {
            this.request.setHeader(key, value);
        }
    }
    /**
     * Sets new HTTP headers for the request.
     *
     * Internally, it calls {@link XMLClient#setHeader} for each defined key/value pair of the headers parameter
     *
     * @param {Object} headers A table containing the header name as its key, and the header contents as its value.
     */
    setHeaders(headers) {
        for (let i in headers) {
            if (!headers.hasOwnProperty(i)) {
                continue;
            }
            this.setHeader(i, headers[i].toString());
        }
    }
    getHeader(name) {
        name = name.toLocaleLowerCase();
        return this.headers[name];
    }
    createHttp(uri) {
        let port = Number.parseInt(uri.port || '80');
        let path = uri.pathname || '/';
        let search = uri.search || '';
        return http.request({
            method: this.method,
            headers: this.headers,
            hostname: uri.hostname,
            path: path + search,
            protocol: uri.protocol,
            port: port
        });
    }
    createHttps(uri) {
        let port = Number.parseInt(uri.port || '443');
        let path = uri.pathname || '/';
        let search = uri.search || '';
        return https.request({
            method: this.method,
            headers: this.headers,
            hostname: uri.hostname,
            path: path + search,
            protocol: uri.protocol,
            port: port
        });
    }
    /**
     * Begins a request, optionally passing a body to be added
     *
     * If the response status code is not success (< 200 or >= 300), then the promise is rejected
     */
    begin(body) {
        let rawData = new Buffer(0);
        let promise = new Promise((resolve, reject) => {
            this.request.on('response', (response) => {
                response.on('data', (chunk) => {
                    rawData = Buffer.concat([rawData, chunk]);
                });
                response.on('end', () => {
                    if (response.statusCode) {
                        if (response.statusCode < 200 || response.statusCode > 299) {
                            let errorData = {
                                status: {
                                    code: response.statusCode,
                                    message: response.statusMessage
                                },
                                rawBody: rawData,
                                strBody: rawData.toString('utf8')
                            };
                            reject(errorData);
                            return;
                        }
                    }
                    try {
                        let jsonResponse = this.decoder.decodeResponse(rawData);
                        resolve(jsonResponse);
                    }
                    catch (e) {
                        let errorData = {
                            error: e
                        };
                        reject(errorData);
                    }
                });
            });
            this.request.on('error', error => {
                let errorData = {
                    error: error
                };
                reject(errorData);
            });
            if (body) {
                let data = this.encoder.processBody(body);
                let length = data.length;
                this.request.setHeader('content-length', length.toFixed(0));
                this.request.write(data);
            }
            this.request.end();
        });
        return promise;
    }
}
exports.Request = Request;
//# sourceMappingURL=request.js.map