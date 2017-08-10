/**
 * The class for interaction with IUGU.
 *
 * Should be constructed passing the API token as parameter (see https://dev.iugu.com/v1.0/reference#autentica%C3%A7%C3%A3o)
 */
export class Iugu {
    private token: string

    public get apiToken(): string {
        return this.token
    }

    /**
     * Initializes the API interaction instance
     *
     * @param apiToken the API token created for your account
     */
    constructor(apiToken: string) {
        this.token = apiToken
    }
}
