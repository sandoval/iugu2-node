"use strict";
/**
 * @file Definition for the Iugu class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
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
     * Returns the account ID
     *
     * @since 0.2.1
     */
    get accountID() {
        return this._accountID;
    }
    /**
     * Sets the account ID. Needed only for payment token creation.
     *
     * @since 0.2.1
     */
    set accountID(v) {
        this._accountID = v;
    }
    /**
     * Access the customer API
     *
     * @since 0.1.0
     */
    get customer() {
        if (!this.customerInstance) {
            this.customerInstance = new api_1.CustomerAPI(this);
        }
        return this.customerInstance;
    }
    /**
     * Access the payment token API
     *
     * @since 0.2.1
     */
    get paymentToken() {
        if (!this.paymentTokenInstance) {
            this.paymentTokenInstance = new api_1.PaymentTokenAPI(this);
        }
        return this.paymentTokenInstance;
    }
    /**
     * Access the plan API
     *
     * @since 0.3.0
     */
    get plan() {
        if (!this.planInstance) {
            this.planInstance = new api_1.PlanAPI(this);
        }
        return this.planInstance;
    }
    /**
     * Access the subscription API
     *
     * @since 0.4.0
     */
    get subscription() {
        if (!this.subscriptionInstance) {
            this.subscriptionInstance = new api_1.SubscriptionAPI(this);
        }
        return this.subscriptionInstance;
    }
    /**
     * Initializes the API interaction instance
     *
     * @param apiToken the API token created for your account. If not passed, it will be read from the environment variable IUGU_TOKEN
     * @param accountId the IUGU account ID
     */
    constructor(apiToken, accountId) {
        if (apiToken) {
            this.token = apiToken;
        }
        else if (process.env.IUGU_TOKEN) {
            this.token = process.env.IUGU_TOKEN;
        }
        else {
            throw new Error('API token not specified');
        }
        if (accountId) {
            this.accountID = accountId;
        }
        else if (process.env.IUGU_ACCOUNTID) {
            this.accountID = process.env.IUGU_ACCOUNTID;
        }
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