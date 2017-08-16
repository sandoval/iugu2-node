"use strict";
/**
 * @file definition for the HookAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 * @since 0.5.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_wrapper_1 = require("./api-wrapper");
/**
 * Defines the api functions for web hooks
 *
 * @since 0.5.0
 */
class HookAPI extends api_wrapper_1.APIWrapper {
    /**
     * Returns a list of all available hooks
     *
     * @returns {Promise<string[]>} a promise that may resolve to a list of available hooks
     */
    listHooks() {
        return this.iugu.makeRequest('GET', '/web_hooks/supported_events').begin();
    }
    /**
     * Returns all created {@link Hook}s
     *
     * Note that this does not use a {@link PagedRequest}
     */
    list() {
        return this.iugu.makeRequest('GET', '/web_hooks').begin();
    }
    /**
     * Retrieves information of a single {@link Hook}
     *
     * @param id the ID of the {@link Hook}
     * @return {Promise<Hook>} a promise that may resolve to a {@link Hook}
     */
    get(id) {
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        return this.iugu.makeRequest('GET', `/web_hooks/${id}`).begin();
    }
    /**
     * Creates a new {@link Hook}
     *
     * @param hook the hook that will be created
     * @returns {Promise<Hook>} a promise that may resolve to the created object
     */
    create(hook) {
        if (hook.id) {
            return Promise.reject(new Error('object has id'));
        }
        return this.iugu.makeRequest('POST', '/web_hooks').begin(hook);
    }
    /**
     * Updates an existing {@link Hook}
     *
     * @param hook the hook that will be updated
     * @returns {Promise<Hook>} a promise that may resolve to the updated object
     */
    update(hook) {
        const id = hook.id;
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        // Deep clone!
        let body = JSON.parse(JSON.stringify(hook));
        // Unsed unchangeable parameters
        delete body.id;
        return this.iugu.makeRequest('PUT', `/web_hooks/${id}`).begin(body);
    }
    /**
     * Deletes an existing {@link Hook}
     *
     * @param {string} id the id of the {@link Hook}
     * @returns {Promise<Hook>} a promise that will resolve to the removed object if the removal was successful and be rejected otherwise
     */
    delete(id) {
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        return this.iugu.makeRequest('DELETE', `/web_hooks/${id}`).begin();
    }
}
exports.HookAPI = HookAPI;
//# sourceMappingURL=hook.js.map