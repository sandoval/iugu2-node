import { APIWrapper } from '../api-wrapper'

import { Customer } from '../../interfaces/customer'
import { PaymentMethod, NewPaymentMethod } from '../../interfaces/payment-method'

import { PagedRequest } from '../../http/paged-request'

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
     * Returns all PaymentMethods for a Customer
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
     * @param customer the ID of the customer or Customer object
     * @param id the ID of the PaymentMethod
     * @return {Promise<PaymentMethod>} a promise resulting in a PaymentMethod
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
     * Creates a new PaymentMethod associated with a Customer
     *
     * @param customer the ID of the customer or Customer object
     * @param paymentMethod the method that will be associated to the Customer
     */
    public create(customer: string | Customer, paymentMethod: NewPaymentMethod): Promise<PaymentMethod> {
        customer = this.customerParamToString(customer)

        if (!customer) {
            return Promise.reject(new Error('invalid_customer_id'))
        }

        return this.iugu.makeRequest<PaymentMethod, NewPaymentMethod>('POST', `/customers/${customer}/payment_methods`).begin(paymentMethod)
    }

    /**
     * Updates an existing PaymentMethod
     *
     * @param customer the customer associated with the PaymentMethod
     * @param paymentMethod the payment method that will be updated
     */
    public update(customer: string | Customer, paymentMethod: PaymentMethod): Promise<PaymentMethod> {
        customer = this.customerParamToString(customer)

        if (!customer) {
            return Promise.reject(new Error('invalid_customer_id'))
        }

        const id = paymentMethod.id

        // Deep clone!
        let body = JSON.parse(JSON.stringify(paymentMethod))

        // Unsed unchangeable parameters
        delete body.id
        delete body.data
        delete body.item_type

        return this.iugu.makeRequest<PaymentMethod, PaymentMethod>('PUT', `/customers/${customer}/payment_methods/${id}`).begin(body)
    }

    /**
     * Deletes an existing PaymentMethod
     */
    public delete(customer: string | Customer, id: string): Promise<void> {
        customer = this.customerParamToString(customer)

        if (!customer) {
            return Promise.reject(new Error('invalid_customer_id'))
        }

        return this.iugu.makeRequest('DELETE', `/customers/${customer}/payment_methods/${id}`).begin()
    }
}
