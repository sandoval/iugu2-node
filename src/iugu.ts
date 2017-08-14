import { Request } from './http/request'
import { PagedRequest } from './http/paged-request'
import { CustomerAPI, PaymentTokenAPI } from './api'

// The default IUGU API url
const API_URL = 'https://api.iugu.com/v1'

/**
 * The class for interaction with IUGU.
 *
 * Should be constructed passing the API token as parameter (see https://dev.iugu.com/v1.0/reference#autentica%C3%A7%C3%A3o)
 */
export class Iugu {
    private _accountID: string;
    private token: string
    private customerInstance: CustomerAPI
    private paymentTokenInstance: PaymentTokenAPI

    /**
     * Returns the current instance API token
     */
    public get apiToken(): string {
        return this.token
    }

    /**
     * Returns the account ID
     */
    public get accountID(): string {
        return this._accountID;
    }

    /**
     * Sets the account ID. Needed only for payment token creation.
     */
    public set accountID(v: string) {
        this._accountID = v;
    }

    /**
     * Access the customer API
     */
    public get customer(): CustomerAPI {
        if (!this.customerInstance) {
            this.customerInstance = new CustomerAPI(this)
        }

        return this.customerInstance
    }

    public get paymentToken(): PaymentTokenAPI {
        if (!this.paymentTokenInstance) {
            this.paymentTokenInstance = new PaymentTokenAPI(this)
        }

        return this.paymentTokenInstance
    }

    /**
     * Initializes the API interaction instance
     *
     * @param apiToken the API token created for your account. If not passed, it will be read from the environment variable IUGU_TOKEN
     * @param accountId the IUGU account ID
     */
    constructor(apiToken?: string, accountId?: string) {
        if (apiToken) {
            this.token = apiToken
        } else if (process.env.IUGU_TOKEN) {
            this.token = <string>process.env.IUGU_TOKEN
        } else {
            throw new Error('API token not specified')
        }

        if (accountId) {
            this.accountID = accountId
        } else if (process.env.IUGU_ACCOUNTID) {
            this.accountID = <string>process.env.IUGU_ACCOUNTID
        }
    }

    /**
     * Returns the string to be set to the Authorization header
     *
     * Output format: "Basic (base64 encoded string: {API token} + ':')"
     */
    public getAuthorizationHeader(): string {
        const unencoded = `${this.apiToken}:`
        const encoded = Buffer.from(unencoded).toString('base64')

        return `Basic ${encoded}`
    }

    /**
     * Creates a new Request, setting to API url and the authorization header
     *
     * @param method The HTTP method to be used
     * @param endpoint The API endpoint, with the preceeding slash
     *
     * @example iugu.makeRequest<Customer>('GET', '/customers')
     */
    public makeRequest<OutType = void, InType = void>(method: string, endpoint: string, headers: any = null): Request<InType, OutType> {
        const request = new Request<InType, OutType>({
            method: method,
            url: API_URL + endpoint,
            headers: headers
        })

        request.setHeader('authorization', this.getAuthorizationHeader())

        return request
    }

    /**
     * Creates a new PagedRequest, setting to API url and the authorization header
     *
     * @param method The HTTP method to be used
     * @param endpoint The API endpoint, with the preceeding slash
     *
     * @example iugu.makePagedRequest<Customer>('GET', '/customers')
     */
    public makePagedRequest<OutType = void, InType = void>(method: string, endpoint: string, limit = 100, headers: any = null): PagedRequest<InType, OutType> {
        const request = new PagedRequest<InType, OutType>(limit, {
            method: method,
            url: API_URL + endpoint,
            headers: headers
        })

        request.setHeader('authorization', this.getAuthorizationHeader())

        return request
    }
}
