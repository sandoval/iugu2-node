"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./http/request");
const paged_request_1 = require("./http/paged-request");
const api_1 = require("./api");
// The default IUGU API url
const API_URL = 'https://api.iugu.com/v1';
/**
 * The class for interaction with IUGU.
 *
 * Should be constructed passing the API token as parameter (see https://dev.iugu.com/v1.0/reference#autentica%C3%A7%C3%A3o)
 */
class Iugu {
    /**
     * Returns the current instance API token
     */
    get apiToken() {
        return this.token;
    }
    /**
     * Access the customer API
     */
    get customer() {
        if (!this.customerInstance) {
            this.customerInstance = new api_1.CustomerAPI(this);
        }
        return this.customerInstance;
    }
    /**
     * Initializes the API interaction instance
     *
     * @param apiToken the API token created for your account
     */
    constructor(apiToken) {
        this.token = apiToken;
    }
    /**
     * Returns the string to be set to the Authorization header
     *
     * Output format: "Basic (base64 encoded string: {API token} + ':')"
     */
    getAuthorizationHeader() {
        const unencoded = `${this.apiToken}:`;
        const encoded = Buffer.from(unencoded).toString('base64');
        return `Basic ${encoded}`;
    }
    /**
     * Creates a new Request, setting to API url and the authorization header
     *
     * @param method The HTTP method to be used
     * @param endpoint The API endpoint, with the preceeding slash
     *
     * @example iugu.makeRequest<Customer>('GET', '/customers')
     */
    makeRequest(method, endpoint, headers = null) {
        const request = new request_1.Request({
            method: method,
            url: API_URL + endpoint,
            headers: headers
        });
        request.setHeader('authorization', this.getAuthorizationHeader());
        return request;
    }
    /**
     * Creates a new PagedRequest, setting to API url and the authorization header
     *
     * @param method The HTTP method to be used
     * @param endpoint The API endpoint, with the preceeding slash
     *
     * @example iugu.makePagedRequest<Customer>('GET', '/customers')
     */
    makePagedRequest(method, endpoint, limit = 100, headers = null) {
        const request = new paged_request_1.PagedRequest(limit, {
            method: method,
            url: API_URL + endpoint,
            headers: headers
        });
        request.setHeader('authorization', this.getAuthorizationHeader());
        return request;
    }
}
exports.Iugu = Iugu;
//# sourceMappingURL=iugu.js.map