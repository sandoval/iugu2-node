"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_wrapper_1 = require("./api-wrapper");
class CustomerAPI extends api_wrapper_1.APIWrapper {
    /**
     * Returns a PagedRequest for all Customers
     */
    list() {
        return this.iugu.makePagedRequest('GET', '/customers');
    }
    /**
     * Retrieves information of a single Customer
     *
     * @return {Promise<Customer>} a promise resulting in a Customer
     */
    get(id) {
        return this.iugu.makeRequest('GET', `/customers/${id}`).begin();
    }
    /**
     * Creates a new Customer
     *
     * @param customer the customer to be created
     */
    create(customer) {
        return this.iugu.makeRequest('POST', '/customers').begin(customer);
    }
    /**
     * Deletes an existing Customer
     */
    delete(id) {
        if (!id) {
            return Promise.reject('invalid_id');
        }
        return this.iugu.makeRequest('DELETE', `/customers/${id}`).begin();
    }
}
exports.CustomerAPI = CustomerAPI;
//# sourceMappingURL=customer.js.map