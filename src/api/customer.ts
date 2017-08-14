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
        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest<Customer>('GET', `/customers/${id}`).begin().then(outCustomer => {
            // Recreate Date fields
            outCustomer.updated_at = new Date(<any>outCustomer.updated_at)
            outCustomer.created_at = new Date(<any>outCustomer.created_at)

            return outCustomer
        })
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

        return this.iugu.makeRequest<Customer, Customer>('POST', '/customers').begin(customer).then(outCustomer => {
            // Recreate Date fields
            outCustomer.updated_at = new Date(<any>outCustomer.updated_at)
            outCustomer.created_at = new Date(<any>outCustomer.created_at)

            return outCustomer
        })
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

        return this.iugu.makeRequest<Customer, Customer>('PUT', `/customers/${id}`).begin(localCustomer).then(outCustomer => {
            // Recreate Date fields
            outCustomer.updated_at = new Date(<any>outCustomer.updated_at)
            outCustomer.created_at = new Date(<any>outCustomer.created_at)

            return outCustomer
        })
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
