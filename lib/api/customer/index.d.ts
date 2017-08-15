/**
 * @file definition for the CustomerAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
import { APIWrapper } from '../api-wrapper';
import { PaymentMethodAPI } from './payment-method';
import { PagedRequest } from '../../http/paged-request';
import { Customer } from '../../interfaces/customer';
export declare class CustomerAPI extends APIWrapper {
    private paymentMethodInstance;
    /**
     * Access the payment method API
     */
    readonly paymentMethod: PaymentMethodAPI;
    /**
     * Returns a PagedRequest for all Customers
     */
    list(): PagedRequest<void, Customer>;
    /**
     * Retrieves information of a single Customer
     *
     * @return {Promise<Customer>} a promise resulting in a Customer
     */
    get(id: string): Promise<Customer>;
    /**
     * Creates a new Customer
     *
     * @param customer the customer to be created
     */
    create(customer: Customer): Promise<Customer>;
    /**
     * Updates an existing Customer
     *
     * @param customer the customer to be updated
     */
    update(customer: Customer): Promise<Customer>;
    /**
     * Deletes an existing Customer
     */
    delete(id: string): Promise<void>;
}
