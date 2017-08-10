import { APIWrapper } from './api-wrapper'

import { PagedRequest } from '../http/paged-request'

import { Customer } from '../interfaces/customer'

export class CustomerAPI extends APIWrapper {
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
        return this.iugu.makeRequest<Customer>('GET', `/customers/${id}`).begin()
    }

    /**
     * Creates a new Customer
     *
     * @param customer the customer to be created
     */
    public create(customer: Customer): Promise<Customer> {
        return this.iugu.makeRequest<Customer, Customer>('POST', '/customers').begin(customer)
    }

    /**
     * Deletes an existing Customer
     */
    public delete(id: string): Promise<void> {
        if (!id) {
            return Promise.reject('invalid_id')
        }

        return this.iugu.makeRequest('DELETE', `/customers/${id}`).begin()
    }
}
