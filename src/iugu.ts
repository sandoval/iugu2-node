import { Request } from './http/request'
import { PagedRequest } from './http/paged-request'
import { CustomerAPI } from './api'

// The default IUGU API url
const API_URL = 'https://api.iugu.com/v1'

/**
 * The class for interaction with IUGU.
 *
 * Should be constructed passing the API token as parameter (see https://dev.iugu.com/v1.0/reference#autentica%C3%A7%C3%A3o)
 */
export class Iugu {
    private token: string
    private customerInstance: CustomerAPI

    /**
     * Returns the current instance API token
     */
    public get apiToken(): string {
        return this.token
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

    /**
     * Initializes the API interaction instance
     *
     * @param apiToken the API token created for your account
     */
    constructor(apiToken: string) {
        this.token = apiToken
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
    public makeRequest<OutType, InType = void>(method: string, endpoint: string, headers: any = null): Request<InType, OutType> {
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
    public makePagedRequest<OutType, InType = void>(method: string, endpoint: string, limit = 100, headers: any = null): PagedRequest<InType, OutType> {
        const request = new PagedRequest<InType, OutType>(limit, {
            method: method,
            url: API_URL + endpoint,
            headers: headers
        })

        request.setHeader('authorization', this.getAuthorizationHeader())

        return request
    }
}
