/// <reference types="node" />
import * as urlmod from 'url';
export interface Response<T> {
    status: {
        code: number;
        message: string;
    };
    body: T;
}
/**
 * Object returned by Request class when the request fails (status code not between 200 and 299)
 */
export interface Error<T> {
    status?: {
        code: number;
        message?: string;
    };
    body?: T;
    strBody?: string;
    error?: any;
}
export interface RequestOptions {
    method: string;
    url?: string;
    headers?: any;
}
/**
 * Class used internally for every request
 */
export declare class Request<InType, OutType> {
    private method;
    private request;
    private headers;
    protected url: urlmod.Url;
    private encoder;
    private decoder;
    constructor(options: RequestOptions);
    /**
     * Sets the URL for the request.
     *
     * Supported protocols are HTTP and HTTPS.
     */
    setUrl(url: string): void;
    /**
     * Sets a new HTTP header for the request.
     *
     * If the header was already set, then its value is updated.
     */
    setHeader(key: string, value: string): void;
    /**
     * Sets new HTTP headers for the request.
     *
     * Internally, it calls `setHeader` for each defined key/value pair of the headers parameter
     *
     * @param {Object} headers A hash table containing the header name as its key, and the header contents as its value.
     */
    setHeaders(headers: any): void;
    /**
     * Gets a header from the headers data
     *
     * @param name the name of the desired header
     * @returns the value for the header if it exists, `undefined` otherwise
     */
    getHeader(name: string): string;
    private createHttp(uri);
    private createHttps(uri);
    /**
     * Begins a request, optionally passing a body to be added
     *
     * If the response status code is not success (< 200 or >= 300), then the promise is rejected
     */
    begin(body?: InType): Promise<OutType>;
}
