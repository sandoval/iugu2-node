/**
 * @file declaration of the PaymentToken interfaces
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

import { CreditCardData } from './payment-method'
import { Identifier } from './object'

/**
 * Struct to be passed as `data` to the NewPaymentToken interface
 *
 * @mixin
 */
export interface PaymentTokenCreditCardData {
    /**
     * Credit card number
     */
    number: string

    /**
     * Card Verification Value (CVV)
     */
    verification_value: string

    /**
     * Card owner's first name, as written on card
     */
    first_name: string

    /**
     * Card owner's last name, as written on card
     */
    last_name: string

    /**
     * Card expiry month
     */
    month: string

    /**
     * Card expiry year
     */
    year: string
}

/**
 * Struct used to generate a new token
 */
export interface NewPaymentToken {
    /**
     * IUGU Account ID
     */
    account_id: string

    /**
     * Payment method. Only supported value, for now, is 'credit_card'
     */
    method: 'credit_card'

    /**
     * Use true for test tokens
     */
    test?: boolean

    /**
     * Payment Method Data
     */
    data: PaymentTokenCreditCardData
}

export interface PaymentToken extends Identifier {
    /**
     * Payment method. Only supported value, for now, is 'credit_card'
     */
    method?: 'credit_card'

    /**
     * Payment method details
     */
    extra_info?: CreditCardData

    /**
     * True for test tokens
     */
    test?: boolean
}
