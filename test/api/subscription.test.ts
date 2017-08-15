/**
 * @file tests for the SubscriptionAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 * @since 0.4.0
 */

// tslint:disable:no-unused-expression
import { expect, should, timeout } from '../chai'
import { token } from '../token'
import { customerDefaults, paymentTokenDefaults, planDefaults } from '../test-defaults'

import { ITestCallbackContext } from 'mocha'

import { Iugu } from '../../src'

import { SubscriptionAPI } from '../../src/api'

import { Customer } from '../../src/interfaces/customer'
import { PaymentMethod, NewPaymentMethod } from '../../src/interfaces/payment-method'
import { Plan, NewPlan } from '../../src/interfaces/plan'
import { Subscription, NewSubscription, UpdateSubscription } from '../../src/interfaces/subscription'

describe('SubscriptionAPI', () => {
    let iugu: Iugu
    let plan: Plan
    let customer: Customer
    let paymentMethod: PaymentMethod
    let subscription: Subscription
    let planIdentifier: string

    const newPaymentMethod: NewPaymentMethod = {
        description: 'Some nice description',
        token: 'TOKEN123456',
        set_as_default: true
    }
    const newSubscription: NewSubscription = {
        expires_at: new Date(new Date().getTime() + 86400000),
        customer_id: '',
        plan_identifier: ''
    }

    before('initializing', () => {
        iugu = new Iugu(token)
        planIdentifier = 'sub_test_plan_' + (Math.random() * 10000).toFixed(0)

        let planData: NewPlan = Object.assign({ identifier: planIdentifier }, planDefaults)
        return iugu.plan.create(planData).then(p => {
            plan = p

            newSubscription.plan_identifier = plan.identifier

            return iugu.customer.create(customerDefaults)
        }).then(c => {
            customer = c

            newSubscription.customer_id = customer.id

            return iugu.paymentToken.create({
                account_id: iugu.accountID,
                method: 'credit_card',
                test: true,
                data: paymentTokenDefaults
            })
        }).then(paymentToken => {
            if (paymentToken && paymentToken.id) {
                newPaymentMethod.token = paymentToken.id
            }

            return iugu.customer.paymentMethod.create(customer, newPaymentMethod)
        }).then(method => {
            paymentMethod = method
        })
    })

    after('cleanup', () => {
        let p: Promise<any> = Promise.resolve().then(() => {
            if (customer && customer.id && paymentMethod && paymentMethod.id) {
                return iugu.customer.paymentMethod.delete(customer.id, paymentMethod.id)
            }
        }).then(() => {
            if (customer && customer.id) {
                return iugu.customer.delete(customer.id)
            }
        }).then(() => {
            if (plan && plan.id) {
                iugu.plan.delete(plan.id)
            }
        })

        return p
    })

    describe('#constructor', () => {
        it('should return a valid instance', () => {
            expect(iugu.subscription).to.be.not.null
            expect(iugu.subscription).to.be.instanceOf(SubscriptionAPI)
        })
    })

    describe('create', () => {
        it('should create a new Subscription', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return iugu.subscription.create(newSubscription).then(s => {
                subscription = s

                expect(s).to.be.not.null
                expect(s.id).to.be.not.empty
            })
        })
    })

    describe('activate', () => {
        it('should activate the created Subscription', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return iugu.subscription.activate(subscription).then(s => {
                subscription = s

                expect(s).to.be.not.null
                expect(s.id).to.be.not.empty
            })
        })
    })

    describe('suspend', () => {
        it('should suspend the created Subscription', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return iugu.subscription.suspend(subscription).then(s => {
                subscription = s

                expect(s).to.be.not.null
                expect(s.id).to.be.not.empty
            })
        })
    })

    describe('delete', () => {
        it('should delete the created Subscription', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return expect(iugu.subscription.delete(subscription)).to.be.fulfilled
        })
    })
})
