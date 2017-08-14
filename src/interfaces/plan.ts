import { Object } from './object'

/**
 * undocumented interface
 */
export interface NewPlanFeature {
    name?: string
    identifier?: string
    value?: number
}
/**
 * Undocumented interface
 */
export interface PlanFeature extends NewPlanFeature, Object {
    important?: any
    plan_id: string
    position: number
}

/**
 * Details of the price of a plan
 */
export interface PlanPrice extends Object {
    /**
     * The currency of the price. Should be 'BRL'
     */
    currency: string

    /**
     * The ID of the associated plan
     */
    plan_id: string

    /**
     * The value, in cents
     */
    value_cents: number
}

export interface BasePlanInfo {
    /**
     * Plan name
     */
    name: string

    /**
     * Plan identifier
     */
    identifier: string

    /**
     * How many `interval_type` will occur before a new charge
     */
    interval: number

    /**
     * The unit for charges. Valid values are 'weeks' and 'months'
     */
    interval_type: 'weeks' | 'months'
}

/**
 * Interface used to create a new Plan
 */
export interface NewPlan extends BasePlanInfo {
    /**
     * Plan price, in cents
     */
    value_cents: number

    /**
     * Which payment methods are allowed for the subscriptions
     */
    payable_with: 'all' | 'credit_card' | 'bank_slip'

    /**
     * Undocumented feature
     */
    features?: NewPlanFeature[]
}

/**
 * Interface describing existing plans
 */
export interface Plan extends Object, BasePlanInfo {
    /**
     * The several prices for this plan
     */
    prices?: PlanPrice[]

    /**
     * Undocumented feature
     */
    features?: PlanFeature[]
}
