/**
 * @file definition for the HookAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 * @since 0.5.0
 */
import { APIWrapper } from './api-wrapper';
import { Hook } from '../interfaces/hook';
/**
 * Defines the api functions for web hooks
 *
 * @since 0.5.0
 */
export declare class HookAPI extends APIWrapper {
    /**
     * Returns a list of all available hooks
     *
     * @returns {Promise<string[]>} a promise that may resolve to a list of available hooks
     */
    listHooks(): Promise<string[]>;
    /**
     * Returns all created {@link Hook}s
     *
     * Note that this does not use a {@link PagedRequest}
     */
    list(): Promise<Hook[]>;
    /**
     * Retrieves information of a single {@link Hook}
     *
     * @param id the ID of the {@link Hook}
     * @return {Promise<Hook>} a promise that may resolve to a {@link Hook}
     */
    get(id: string): Promise<Hook>;
    /**
     * Creates a new {@link Hook}
     *
     * @param hook the hook that will be created
     * @returns {Promise<Hook>} a promise that may resolve to the created object
     */
    create(hook: Hook): Promise<Hook>;
    /**
     * Updates an existing {@link Hook}
     *
     * @param hook the hook that will be updated
     * @returns {Promise<Hook>} a promise that may resolve to the updated object
     */
    update(hook: Hook): Promise<Hook>;
    /**
     * Deletes an existing {@link Hook}
     *
     * @param {string} id the id of the {@link Hook}
     * @returns {Promise<Hook>} a promise that will resolve to the removed object if the removal was successful and be rejected otherwise
     */
    delete(id: string): Promise<Hook>;
}
