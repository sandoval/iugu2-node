/**
 * @file declaration of the PaymentMethod interfaces
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

import { Identifier } from './object'

/**
 * Structure of a Credit Card inside payment method
 * @mixin
 */
export interface CreditCardData {
    /**
     * The name written on the credit card
     */
    holder_name?: string

    /**
     * How this credit card should be displayed
     */
    display_number?: string

    /**
     * The brand of the card
     */
    brand?: string

    /**
     * Card expiry month
     */
    month?: number

    /**
     * Card expiry year
     */
    year?: number
}

/**
 * Declares a payment method associated with a Customer
 */
export interface PaymentMethod extends Identifier {
    /**
     * The description that should be shown to the user
     */
    description?: string

    /**
     * The type of the payment method
     */
    item_type?: string

    /**
     * Information about the payment method
     */
    data?: CreditCardData
}

/**
 * Body passed to the Payment Method creation API
 */
export interface NewPaymentMethod {
    /**
     * The description that should be shown to the user
     */
    description: string

    /**
     * The token of the payment method.
     */
    token: string

    /**
     * Should this payment method be the default for the user.
     */
    set_as_default?: boolean
}
