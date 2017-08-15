/**
 * @file definition for the PaymentMethodAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
import { APIWrapper } from '../api-wrapper';
import { Customer } from '../../interfaces/customer';
import { PaymentMethod, NewPaymentMethod } from '../../interfaces/payment-method';
export declare class PaymentMethodAPI extends APIWrapper {
    private customerParamToString(customer);
    /**
     * Returns all PaymentMethods for a {@link Customer}
     *
     * Note that this does not use a {@link PagedRequest}
     *
     * @param customer the ID of the customer or a {@link Customer} object
     */
    list(customer: string | Customer): Promise<PaymentMethod[]>;
    /**
     * Retrieves information of a single PaymentMethod
     *
     * @param customer the ID of the customer or a {@link Customer} object
     * @param id the ID of the {@link PaymentMethod}
     * @return {Promise<PaymentMethod>} a promise that will result in a {@link PaymentMethod} if both parameters are valid
     */
    get(customer: string | Customer, id: string): Promise<PaymentMethod>;
    /**
     * Creates a new {@link PaymentMethod} associated with a {@link Customer}
     *
     * @param customer the ID of the customer or a {@link Customer} object
     * @param paymentMethod the method that will be associated to the {@link Customer}
     * @returns {Promise<PaymentMethod>} a promise that may resolve to the created object
     */
    create(customer: string | Customer, paymentMethod: NewPaymentMethod): Promise<PaymentMethod>;
    /**
     * Updates an existing {@link PaymentMethod}
     *
     * @param customer the ID of the customer or the {@link Customer} object associated with the {@link PaymentMethod}
     * @param paymentMethod the payment method that will be updated
     * @returns {Promise<PaymentMethod>} a promise that may resolve to the updated object
     */
    update(customer: string | Customer, paymentMethod: PaymentMethod): Promise<PaymentMethod>;
    /**
     * Deletes an existing {@link PaymentMethod}
     *
     * @param customer the ID of the customer or the {@link Customer} object that the {@link PaymentMethod} belongs to
     * @param {string} id the id of the {@link PaymentMethod}
     * @returns {Promise<void>} a promise that will resolve if the removal was successful and be rejected otherwise
     */
    delete(customer: string | Customer, id: string): Promise<void>;
}
