/**
 * @file definition for the PlanAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
import { APIWrapper } from './api-wrapper';
import { PagedRequest } from '../http/paged-request';
import { Plan, NewPlan } from '../interfaces/plan';
export declare class PlanAPI extends APIWrapper {
    /**
     * Creates a new {@link Plan}
     *
     * @param {NewPlan} planData the data for the plan that will be created
     * @returns {Promise<Plan>} a promise that may resolve to the created object
     */
    create(planData: NewPlan): Promise<Plan>;
    /**
     * Returns information of an existing {@link Plan}
     *
     * @param {string} id the ID of the {@link Plan}
     * @returns {Promise<Plan>} a promise that may resolve to the desired object or be rejected if the id is invalid
     */
    get(id: string): Promise<Plan>;
    /**
     * Returns information of an existing {@link Plan}
     *
     * @param {string} identifier the identifier of the {@link Plan}
     * @returns {Promise<Plan>} a promise that may resolve to the desired object or be rejected if the identifier is invalid
     */
    getByIdentifier(identifier: string): Promise<Plan>;
    /**
     * Returns a {@link PagedRequest} for all {@link Customer}s
     */
    list(): PagedRequest<void, Plan>;
    /**
     * Updates an existing {@link Plan}
     *
     * @param {Plan} plan the {@link Plan} to be updated
     * @returns {Promise<Plan>} a promise that may resolve to the updated object
     */
    update(plan: Plan): Promise<Plan>;
    /**
     * Deletes an existing {@link Plan}
     *
     * @returns {Promise<void>} a promise that will resolve if the removal was successful and be rejected otherwise
     */
    delete(id: string): Promise<void>;
}
