"use strict";
/**
 * @file definition for the CustomerAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_wrapper_1 = require("../api-wrapper");
const payment_method_1 = require("./payment-method");
const object_1 = require("../../interfaces/object");
class CustomerAPI extends api_wrapper_1.APIWrapper {
    /**
     * Access the payment method API
     */
    get paymentMethod() {
        if (!this.paymentMethodInstance) {
            this.paymentMethodInstance = new payment_method_1.PaymentMethodAPI(this.iugu);
        }
        return this.paymentMethodInstance;
    }
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
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        return this.iugu.makeRequest('GET', `/customers/${id}`).begin().then(outCustomer => object_1.recreateDateFields(outCustomer));
    }
    /**
     * Creates a new Customer
     *
     * @param customer the customer to be created
     */
    create(customer) {
        if (customer.id) {
            return Promise.reject(new Error('invalid_parameter'));
        }
        return this.iugu.makeRequest('POST', '/customers').begin(customer).then(outCustomer => object_1.recreateDateFields(outCustomer));
    }
    /**
     * Updates an existing Customer
     *
     * @param customer the customer to be updated
     */
    update(customer) {
        if (!customer.id) {
            return Promise.reject(new Error('invalid_id'));
        }
        const id = customer.id;
        // Deep clone!
        let localCustomer = JSON.parse(JSON.stringify(customer));
        // Remove Object fields if needed
        delete localCustomer.id;
        delete localCustomer.created_at;
        delete localCustomer.updated_at;
        return this.iugu.makeRequest('PUT', `/customers/${id}`).begin(localCustomer).then(outCustomer => object_1.recreateDateFields(outCustomer));
    }
    /**
     * Deletes an existing Customer
     */
    delete(id) {
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        return this.iugu.makeRequest('DELETE', `/customers/${id}`).begin();
    }
}
exports.CustomerAPI = CustomerAPI;
//# sourceMappingURL=index.js.map