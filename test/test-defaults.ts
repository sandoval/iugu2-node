/**
 * @file contain default values for a Customer that will be created during tests
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

import { Customer } from '../src/interfaces/customer'
import { PaymentTokenCreditCardData } from '../src/interfaces/payment-token'
import { NewPlan } from '../src/interfaces/plan'

export const customerDefaults: Customer = {
    name: 'Bruno Ferreira',
    email: 'shirayuki@kitsune.com.br'
}

export const paymentTokenDefaults: PaymentTokenCreditCardData = {
    first_name: 'Bruno',
    last_name: 'Ferreira',
    month: '12',
    year: '2039',
    number: '378282246310005',
    verification_value: '3939'
}

export const planDefaults: NewPlan = {
    name: 'Test Plan',
    interval: 1,
    interval_type: 'months',
    payable_with: 'all',
    value_cents: 1999
}
