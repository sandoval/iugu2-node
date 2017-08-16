/**
 * @file Definition for the Iugu class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
import { Request } from './http/request';
import { PagedRequest } from './http/paged-request';
import { CustomerAPI, HookAPI, PaymentTokenAPI, PlanAPI, SubscriptionAPI } from './api';
/**
 * The class for interaction with IUGU.
 *
 * Should be constructed passing the API token as parameter (see https://dev.iugu.com/v1.0/reference#autentica%C3%A7%C3%A3o)
 */
export declare class Iugu {
    private _accountID;
    private token;
    private customerInstance;
    private hookInstance;
    private paymentTokenInstance;
    private planInstance;
    private subscriptionInstance;
    /**
     * Returns the current instance API token
     */
    readonly apiToken: string;
    /**
     * Returns the account ID
     *
     * @since 0.2.1
     */
    /**
     * Sets the account ID. Needed only for payment token creation.
     *
     * @since 0.2.1
     */
    accountID: string;
    /**
     * Access the customer API
     *
     * @since 0.1.0
     */
    readonly customer: CustomerAPI;
    /**
     * Access the hook API
     *
     * @since 0.5.0
     */
    readonly hook: HookAPI;
    /**
     * Access the payment token API
     *
     * @since 0.2.1
     */
    readonly paymentToken: PaymentTokenAPI;
    /**
     * Access the plan API
     *
     * @since 0.3.0
     */
    readonly plan: PlanAPI;
    /**
     * Access the subscription API
     *
     * @since 0.4.0
     */
    readonly subscription: SubscriptionAPI;
    /**
     * Initializes the API interaction instance
     *
     * @param apiToken the API token created for your account. If not passed, it will be read from the environment variable IUGU_TOKEN
     * @param accountId the IUGU account ID
     */
    constructor(apiToken?: string, accountId?: string);
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
