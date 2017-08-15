/**
 * @file definition for the PaymentMethodAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

import { APIWrapper } from '../api-wrapper'

import { Customer } from '../../interfaces/customer'
import { PaymentMethod, NewPaymentMethod } from '../../interfaces/payment-method'

export class PaymentMethodAPI extends APIWrapper {
    private customerParamToString(customer: string | Customer): string {
        if (typeof(customer) === 'object') {
            if (!customer.id) {
                return ''
            }

            return customer.id
        }

        return customer
    }

    /**
     * Returns all PaymentMethods for a {@link Customer}
     *
     * Note that this does not use a {@link PagedRequest}
     *
     * @param customer the ID of the customer or a {@link Customer} object
     */
    public list(customer: string | Customer): Promise<PaymentMethod[]> {
        customer = this.customerParamToString(customer)

        if (!customer) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest<PaymentMethod[]>('GET', `/customers/${customer}/payment_methods`).begin()
    }

    /**
     * Retrieves information of a single PaymentMethod
     *
     * @param customer the ID of the customer or a {@link Customer} object
     * @param id the ID of the {@link PaymentMethod}
     * @return {Promise<PaymentMethod>} a promise that will result in a {@link PaymentMethod} if both parameters are valid
     */
    public get(customer: string | Customer, id: string): Promise<PaymentMethod> {
        customer = this.customerParamToString(customer)

        if (!customer) {
            return Promise.reject(new Error('invalid_customer_id'))
        }

        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest<PaymentMethod>('GET', `/customers/${customer}/payment_methods/${id}`).begin()
    }

    /**
     * Creates a new {@link PaymentMethod} associated with a {@link Customer}
     *
     * @param customer the ID of the customer or a {@link Customer} object
     * @param paymentMethod the method that will be associated to the {@link Customer}
     * @returns {Promise<PaymentMethod>} a promise that may resolve to the created object
     */
    public create(customer: string | Customer, paymentMethod: NewPaymentMethod): Promise<PaymentMethod> {
        customer = this.customerParamToString(customer)

        if (!customer) {
            return Promise.reject(new Error('invalid_customer_id'))
        }

        return this.iugu.makeRequest<PaymentMethod, NewPaymentMethod>('POST', `/customers/${customer}/payment_methods`).begin(paymentMethod)
    }

    /**
     * Updates an existing {@link PaymentMethod}
     *
     * @param customer the ID of the customer or the {@link Customer} object associated with the {@link PaymentMethod}
     * @param paymentMethod the payment method that will be updated
     * @returns {Promise<PaymentMethod>} a promise that may resolve to the updated object
     */
    public update(customer: string | Customer, paymentMethod: PaymentMethod): Promise<PaymentMethod> {
        customer = this.customerParamToString(customer)

        if (!customer) {
            return Promise.reject(new Error('invalid_customer_id'))
        }

        const id = paymentMethod.id

        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        // Deep clone!
        let body = JSON.parse(JSON.stringify(paymentMethod))

        // Unsed unchangeable parameters
        delete body.id
        delete body.data
        delete body.item_type

        return this.iugu.makeRequest<PaymentMethod, PaymentMethod>('PUT', `/customers/${customer}/payment_methods/${id}`).begin(body)
    }

    /**
     * Deletes an existing {@link PaymentMethod}
     *
     * @param customer the ID of the customer or the {@link Customer} object that the {@link PaymentMethod} belongs to
     * @param {string} id the id of the {@link PaymentMethod}
     * @returns {Promise<void>} a promise that will resolve if the removal was successful and be rejected otherwise
     */
    public delete(customer: string | Customer, id: string): Promise<void> {
        customer = this.customerParamToString(customer)

        if (!customer) {
            return Promise.reject(new Error('invalid_customer_id'))
        }

        return this.iugu.makeRequest('DELETE', `/customers/${customer}/payment_methods/${id}`).begin()
    }
}
