/**
 * @file definition for the SubscriptionAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 * @since 0.4.0
 */

import { APIWrapper } from './api-wrapper'

import { recreateDateFields } from '../interfaces/object'
import { NewSubscription, Subscription, UpdateSubscription } from '../interfaces/subscription'

import { PagedRequest } from '../http/paged-request'

export class SubscriptionAPI extends APIWrapper {
    private subscriptionParamToString(subscription: string | Subscription): string {
        if (typeof(subscription) === 'object') {
            if (!subscription.id) {
                return ''
            }

            return subscription.id
        }

        return subscription
    }

    private recreateExpires(sub: Subscription): Subscription {
        if (sub.expires_at) {
            sub.expires_at = new Date(<any>sub.expires_at)
        }

        return recreateDateFields(sub)
    }

    /**
     * Creates a new {@link Subscription}
     *
     * @param data the data for the subscription that will be created
     * @returns {Promise<Subscription>} a promise that may resolve to the created object
     */
    public create(data: NewSubscription): Promise<Subscription> {
        return this.iugu.makeRequest<Subscription, NewSubscription>('POST', '/subscriptions').begin(data).then(s => this.recreateExpires(s))
    }

    /**
     * Retrieves information of an existing subscription
     *
     * @param subscription the id or object of the subscription that will be retrieved
     * @returns a promise that may resolve to the subscription object
     */
    public get(subscription: string | Subscription): Promise<Subscription> {
        const id = this.subscriptionParamToString(subscription)

        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest<Subscription>('GET', `/subscriptions/${id}`).begin().then(s => this.recreateExpires(s))
    }

    /**
     * Returns all existing Subscriptions
     */
    public list(): PagedRequest<void, Subscription> {
        return this.iugu.makePagedRequest<Subscription>('GET', `/subscriptions`)
    }

    /**
     * Activates an existing subscription
     *
     * @param subscription the id or object of the subscription that will be activated
     * @returns a promise that may resolve to the associated subscription object
     */
    public activate(subscription: string | Subscription): Promise<Subscription> {
        const id = this.subscriptionParamToString(subscription)

        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest<Subscription>('POST', `/subscriptions/${id}/activate`).begin().then(s => this.recreateExpires(s))
    }

    /**
     * Suspends an existing subscription
     *
     * @param subscription the id or object of the subscription that will be suspended
     * @returns a promise that may resolve to the associated subscription object
     */
    public suspend(subscription: string | Subscription): Promise<Subscription> {
        const id = this.subscriptionParamToString(subscription)

        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest<Subscription>('POST', `/subscriptions/${id}/suspend`).begin().then(s => this.recreateExpires(s))
    }

    /**
     * Updates an existing subscription
     *
     * @param subscription the id or object of the subscription that will be modified
     * @returns a promise that may resolve to the associated subscription object
     */
    public update(subscription: string | Subscription, newData: UpdateSubscription): Promise<Subscription> {
        const id = this.subscriptionParamToString(subscription)

        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest<Subscription, UpdateSubscription>('PUT', `/subscriptions/${id}`).begin(newData).then(s => this.recreateExpires(s))
    }

    /**
     * Deletes an existing subscription
     *
     * @param subscription the id or object of the subscription that will be deleted
     * @returns a promise that may resolve to the deleted subscription object
     */
    public delete(subscription: string | Subscription): Promise<Subscription> {
        const id = this.subscriptionParamToString(subscription)

        if (!id) {
            return Promise.reject(new Error('invalid_id'))
        }

        return this.iugu.makeRequest<Subscription>('DELETE', `/subscriptions/${id}`).begin().then(s => this.recreateExpires(s))
    }
}
