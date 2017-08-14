import { APIWrapper } from './api-wrapper'

import { PaymentToken, NewPaymentToken } from '../interfaces/payment-token'

export class PaymentTokenAPI extends APIWrapper {
    /**
     * Creates a new PaymentToken
     *
     * @param tokenData the data for the token that will be created
     */
    public create(tokenData: NewPaymentToken): Promise<PaymentToken> {
        return this.iugu.makeRequest<PaymentToken, NewPaymentToken>('POST', '/payment_token').begin(tokenData)
    }
}
