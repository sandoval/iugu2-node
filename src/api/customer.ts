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
}
