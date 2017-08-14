import { APIWrapper } from './api-wrapper'

import { PagedRequest } from '../http/paged-request'

import { recreateDateFields } from '../interfaces/object'
import { Plan, NewPlan } from '../interfaces/plan'

export class PlanAPI extends APIWrapper {
    /**
     * Creates a new Plan
     *
     * @param planData the data for the plan that will be created
     */
    public create(planData: NewPlan): Promise<Plan> {
        return this.iugu.makeRequest<Plan, NewPlan>('POST', '/plans').begin(planData).then(outPlan => recreateDateFields(outPlan))
    }

    /**
     * Returns information of an existing Plan
     *
     * @param id the ID of the Plan
     */
    public get(id: string): Promise<Plan> {
        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest<Plan>('GET', `/plans/${id}`).begin()
    }

    /**
     * Returns information of an existing Plan
     *
     * @param id the identifier of the Plan
     */
    public getByIdentifier(identifier: string): Promise<Plan> {
        if (!identifier) {
            return Promise.reject(new Error('invalid_identifier'))
        }

        return this.iugu.makeRequest<Plan>('GET', `/plans/identifier/${identifier}`).begin()
    }

    /**
     * Returns a PagedRequest for all Customers
     */
    public list(): PagedRequest<void, Plan> {
        return this.iugu.makePagedRequest<Plan>('GET', '/plans')
    }

    /**
     * Updates an existing Plan
     *
     * @param plan the Plan to be updated
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
     * Deletes an existing Plan
     */
    public delete(id: string): Promise<void> {
        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest('DELETE', `/plans/${id}`).begin()
    }
}
