"use strict";
/**
 * @file definition for the PlanAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_wrapper_1 = require("./api-wrapper");
const object_1 = require("../interfaces/object");
class PlanAPI extends api_wrapper_1.APIWrapper {
    /**
     * Creates a new {@link Plan}
     *
     * @param {NewPlan} planData the data for the plan that will be created
     * @returns {Promise<Plan>} a promise that may resolve to the created object
     */
    create(planData) {
        return this.iugu.makeRequest('POST', '/plans').begin(planData).then(outPlan => object_1.recreateDateFields(outPlan));
    }
    /**
     * Returns information of an existing {@link Plan}
     *
     * @param {string} id the ID of the {@link Plan}
     * @returns {Promise<Plan>} a promise that may resolve to the desired object or be rejected if the id is invalid
     */
    get(id) {
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        return this.iugu.makeRequest('GET', `/plans/${id}`).begin();
    }
    /**
     * Returns information of an existing {@link Plan}
     *
     * @param {string} identifier the identifier of the {@link Plan}
     * @returns {Promise<Plan>} a promise that may resolve to the desired object or be rejected if the identifier is invalid
     */
    getByIdentifier(identifier) {
        if (!identifier) {
            return Promise.reject(new Error('invalid_identifier'));
        }
        return this.iugu.makeRequest('GET', `/plans/identifier/${identifier}`).begin();
    }
    /**
     * Returns a {@link PagedRequest} for all {@link Customer}s
     */
    list() {
        return this.iugu.makePagedRequest('GET', '/plans');
    }
    /**
     * Updates an existing {@link Plan}
     *
     * @param {Plan} plan the {@link Plan} to be updated
     * @returns {Promise<Plan>} a promise that may resolve to the updated object
     */
    update(plan) {
        if (!plan.id) {
            return Promise.reject(new Error('invalid_id'));
        }
        const id = plan.id;
        // Deep clone!
        let localPlan = JSON.parse(JSON.stringify(plan));
        // Remove Object fields if needed
        delete localPlan.id;
        delete localPlan.created_at;
        delete localPlan.updated_at;
        return this.iugu.makeRequest('PUT', `/plans/${id}`).begin(localPlan).then(outPlan => object_1.recreateDateFields(outPlan));
    }
    /**
     * Deletes an existing {@link Plan}
     *
     * @returns {Promise<void>} a promise that will resolve if the removal was successful and be rejected otherwise
     */
    delete(id) {
        if (!id) {
            return Promise.reject(new Error('invalid_id'));
        }
        return this.iugu.makeRequest('DELETE', `/plans/${id}`).begin();
    }
}
exports.PlanAPI = PlanAPI;
//# sourceMappingURL=plan.js.map