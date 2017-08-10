import { Request } from './http/request';
import { PagedRequest } from './http/paged-request';
import { CustomerAPI } from './api';
/**
 * The class for interaction with IUGU.
 *
 * Should be constructed passing the API token as parameter (see https://dev.iugu.com/v1.0/reference#autentica%C3%A7%C3%A3o)
 */
export declare class Iugu {
    private token;
    private customerInstance;
    /**
     * Returns the current instance API token
     */
    readonly apiToken: string;
    /**
     * Access the customer API
     */
    readonly customer: CustomerAPI;
    /**
     * Initializes the API interaction instance
     *
     * @param apiToken the API token created for your account
     */
    constructor(apiToken: string);
    /**
     * Returns the string to be set to the Authorization header
     *
     * Output format: "Basic (base64 encoded string: {API token} + ':')"
     */
    getAuthorizationHeader(): string;
    /**
     * Creates a new Request, setting to API url and the authorization header
     *
     * @param method The HTTP method to be used
     * @param endpoint The API endpoint, with the preceeding slash
     *
     * @example iugu.makeRequest<Customer>('GET', '/customers')
     */
    makeRequest<OutType = void, InType = void>(method: string, endpoint: string, headers?: any): Request<InType, OutType>;
    /**
     * Creates a new PagedRequest, setting to API url and the authorization header
     *
     * @param method The HTTP method to be used
     * @param endpoint The API endpoint, with the preceeding slash
     *
     * @example iugu.makePagedRequest<Customer>('GET', '/customers')
     */
    makePagedRequest<OutType = void, InType = void>(method: string, endpoint: string, limit?: number, headers?: any): PagedRequest<InType, OutType>;
}
