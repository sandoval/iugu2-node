import { APIWrapper } from '../api-wrapper'
import { PaymentMethodAPI } from './payment-method'

import { PagedRequest } from '../../http/paged-request'

import { recreateDateFields } from '../../interfaces/object'
import { Customer } from '../../interfaces/customer'

export class CustomerAPI extends APIWrapper {
    private paymentMethodInstance: PaymentMethodAPI

    /**
     * Access the payment method API
     */
    public get paymentMethod(): PaymentMethodAPI {
        if (!this.paymentMethodInstance) {
            this.paymentMethodInstance = new PaymentMethodAPI(this.iugu)
        }

        return this.paymentMethodInstance
    }

    /**
     * Returns a PagedRequest for all Customers
     */
    public list(): PagedRequest<void, Customer> {
        return this.iugu.makePagedRequest<Customer>('GET', '/customers')
    }

    /**
     * Retrieves information of a single Customer
     *
     * @return {Promise<Customer>} a promise resulting in a Customer
     */
    public get(id: string): Promise<Customer> {
        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest<Customer>('GET', `/customers/${id}`).begin().then(outCustomer => recreateDateFields(outCustomer))
    }

    /**
     * Creates a new Customer
     *
     * @param customer the customer to be created
     */
    public create(customer: Customer): Promise<Customer> {
        if (customer.id) {
            return Promise.reject(new Error('invalid_parameter'))
        }

        return this.iugu.makeRequest<Customer, Customer>('POST', '/customers').begin(customer).then(outCustomer => recreateDateFields(outCustomer))
    }

    /**
     * Updates an existing Customer
     *
     * @param customer the customer to be updated
     */
    public update(customer: Customer): Promise<Customer> {
        if (!customer.id) {
            return Promise.reject(new Error('invalid_id'))
        }

        const id = customer.id

        // Deep clone!
        let localCustomer = JSON.parse(JSON.stringify(customer))

        // Remove Object fields if needed
        delete localCustomer.id
        delete localCustomer.created_at
        delete localCustomer.updated_at

        return this.iugu.makeRequest<Customer, Customer>('PUT', `/customers/${id}`).begin(localCustomer).then(outCustomer => recreateDateFields(outCustomer))
    }

    /**
     * Deletes an existing Customer
     */
    public delete(id: string): Promise<void> {
        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest('DELETE', `/customers/${id}`).begin()
    }
}
