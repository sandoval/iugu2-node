/**
 * @file definition for the PaymentTokenAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
import { APIWrapper } from './api-wrapper';
import { PaymentToken, NewPaymentToken } from '../interfaces/payment-token';
export declare class PaymentTokenAPI extends APIWrapper {
    /**
     * Creates a new PaymentToken
     *
     * @param tokenData the data for the token that will be created
     * @returns {Promise<PaymentToken>} a promise that may resolve to the created object
     */
    create(tokenData: NewPaymentToken): Promise<PaymentToken>;
}
