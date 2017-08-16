"use strict";
/**
 * @file definition for the SubscriptionAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 * @since 0.4.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_wrapper_1 = require("./api-wrapper");
const object_1 = require("../interfaces/object");
class SubscriptionAPI extends api_wrapper_1.APIWrapper {
    subscriptionParamToString(subscription) {
        if (typeof (subscription) === 'object') {
            if (!subscription.id) {
                return '';
            }
            return subscription.id;
        }
        return subscription;
    }
    recreateExpires(sub) {
        if (sub.expires_at) {
            sub.expires_at = new Date(sub.expires_at);
        }
        return object_1.recreateDateFields(sub);
    }
    /**
     * Creates a new {@link Subscription}
     *
     * @param data the data for the subscription that will be created
     * @returns {Promise<Subscription>} a promise that may resolve to the created object
     */
    create(data) {
        return this.iugu.makeRequest('POST', '/subscriptions').begin(data).then(s => this.recreateExpires(s));
    }
    /**
     * Retrieves information of an existing subscription
     *
     * @param subscription the id or object of the subscription that will be retrieved
     * @returns a promise that may resolve to the subscription object
     */
    get(subscription) {
        const id = this.subscriptionParamToString(subscription);
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        return this.iugu.makeRequest('GET', `/subscriptions/${id}`).begin().then(s => this.recreateExpires(s));
    }
    /**
     * Returns all existing Subscriptions
     */
    list() {
        return this.iugu.makePagedRequest('GET', `/subscriptions`);
    }
    /**
     * Activates an existing subscription
     *
     * @param subscription the id or object of the subscription that will be activated
     * @returns a promise that may resolve to the associated subscription object
     */
    activate(subscription) {
        const id = this.subscriptionParamToString(subscription);
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        return this.iugu.makeRequest('POST', `/subscriptions/${id}/activate`).begin().then(s => this.recreateExpires(s));
    }
    /**
     * Suspends an existing subscription
     *
     * @param subscription the id or object of the subscription that will be suspended
     * @returns a promise that may resolve to the associated subscription object
     */
    suspend(subscription) {
        const id = this.subscriptionParamToString(subscription);
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        return this.iugu.makeRequest('POST', `/subscriptions/${id}/suspend`).begin().then(s => this.recreateExpires(s));
    }
    /**
     * Updates an existing subscription
     *
     * @param subscription the id or object of the subscription that will be modified
     * @returns a promise that may resolve to the associated subscription object
     */
    update(subscription, newData) {
        const id = this.subscriptionParamToString(subscription);
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        return this.iugu.makeRequest('PUT', `/subscriptions/${id}`).begin(newData).then(s => this.recreateExpires(s));
    }
    /**
     * Deletes an existing subscription
     *
     * @param subscription the id or object of the subscription that will be deleted
     * @returns a promise that may resolve to the deleted subscription object
     */
    delete(subscription) {
        const id = this.subscriptionParamToString(subscription);
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        return this.iugu.makeRequest('DELETE', `/subscriptions/${id}`).begin().then(s => this.recreateExpires(s));
    }
}
exports.SubscriptionAPI = SubscriptionAPI;
//# sourceMappingURL=subscription.js.map