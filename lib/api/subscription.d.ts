/**
 * @file definition for the SubscriptionAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 * @since 0.4.0
 */
import { APIWrapper } from './api-wrapper';
import { NewSubscription, Subscription, UpdateSubscription } from '../interfaces/subscription';
import { PagedRequest } from '../http/paged-request';
export declare class SubscriptionAPI extends APIWrapper {
    private subscriptionParamToString(subscription);
    /**
     * Creates a new {@link Subscription}
     *
     * @param data the data for the subscription that will be created
     * @returns {Promise<Subscription>} a promise that may resolve to the created object
     */
    create(data: NewSubscription): Promise<Subscription>;
    /**
     * Retrieves information of an existing subscription
     *
     * @param subscription the id or object of the subscription that will be retrieved
     * @returns a promise that may resolve to the subscription object
     */
    get(subscription: string | Subscription): Promise<Subscription>;
    /**
     * Returns all existing Subscriptions
     */
    list(): PagedRequest<void, Subscription>;
    /**
     * Activates an existing subscription
     *
     * @param subscription the id or object of the subscription that will be activated
     * @returns a promise that may resolve to the associated subscription object
     */
    activate(subscription: string | Subscription): Promise<Subscription>;
    /**
     * Suspends an existing subscription
     *
     * @param subscription the id or object of the subscription that will be suspended
     * @returns a promise that may resolve to the associated subscription object
     */
    suspend(subscription: string | Subscription): Promise<Subscription>;
    /**
     * Updates an existing subscription
     *
     * @param subscription the id or object of the subscription that will be modified
     * @returns a promise that may resolve to the associated subscription object
     */
    update(subscription: string | Subscription, newData: UpdateSubscription): Promise<Subscription>;
    /**
     * Deletes an existing subscription
     *
     * @param subscription the id or object of the subscription that will be deleted
     * @returns a promise that may resolve to the deleted subscription object
     */
    delete(subscription: string | Subscription): Promise<Subscription>;
}
