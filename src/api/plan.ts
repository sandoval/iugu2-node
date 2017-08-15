/**
 * @file definition for the PlanAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

import { APIWrapper } from './api-wrapper'

import { PagedRequest } from '../http/paged-request'

import { recreateDateFields } from '../interfaces/object'
import { Plan, NewPlan } from '../interfaces/plan'

export class PlanAPI extends APIWrapper {
    /**
     * Creates a new {@link Plan}
     *
     * @param {NewPlan} planData the data for the plan that will be created
     * @returns {Promise<Plan>} a promise that may resolve to the created object
     */
    public create(planData: NewPlan): Promise<Plan> {
        return this.iugu.makeRequest<Plan, NewPlan>('POST', '/plans').begin(planData).then(outPlan => recreateDateFields(outPlan))
    }

    /**
     * Returns information of an existing {@link Plan}
     *
     * @param {string} id the ID of the {@link Plan}
     * @returns {Promise<Plan>} a promise that may resolve to the desired object or be rejected if the id is invalid
     */
    public get(id: string): Promise<Plan> {
        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest<Plan>('GET', `/plans/${id}`).begin()
    }

    /**
     * Returns information of an existing {@link Plan}
     *
     * @param {string} identifier the identifier of the {@link Plan}
     * @returns {Promise<Plan>} a promise that may resolve to the desired object or be rejected if the identifier is invalid
     */
    public getByIdentifier(identifier: string): Promise<Plan> {
        if (!identifier) {
            return Promise.reject(new Error('invalid_identifier'))
        }

        return this.iugu.makeRequest<Plan>('GET', `/plans/identifier/${identifier}`).begin()
    }

    /**
     * Returns a {@link PagedRequest} for all {@link Customer}s
     */
    public list(): PagedRequest<void, Plan> {
        return this.iugu.makePagedRequest<Plan>('GET', '/plans')
    }

    /**
     * Updates an existing {@link Plan}
     *
     * @param {Plan} plan the {@link Plan} to be updated
     * @returns {Promise<Plan>} a promise that may resolve to the updated object
     */
    public update(plan: Plan): Promise<Plan> {
        if (!plan.id) {
            return Promise.reject(new Error('invalid_id'))
        }

        const id = plan.id

        // Deep clone!
        let localPlan = JSON.parse(JSON.stringify(plan))

        // Remove Object fields if needed
        delete localPlan.id
        delete localPlan.created_at
        delete localPlan.updated_at

        return this.iugu.makeRequest<Plan, Plan>('PUT', `/plans/${id}`).begin(localPlan).then(outPlan => recreateDateFields(outPlan))
    }

    /**
     * Deletes an existing {@link Plan}
     *
     * @returns {Promise<void>} a promise that will resolve if the removal was successful and be rejected otherwise
     */
    public delete(id: string): Promise<void> {
        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest('DELETE', `/plans/${id}`).begin()
    }
}
