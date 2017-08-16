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

    before('initializing', function (this: ITestCallbackContext) {
        this.timeout(timeout * 2)

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

        it('should fail with an invalid id', () => {
            return expect(iugu.subscription.activate('')).to.be.rejectedWith(Error, 'invalid_id');
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

        it('should fail with an invalid id', () => {
            return expect(iugu.subscription.suspend({})).to.be.rejectedWith(Error, 'invalid_id');
        })
    })

    describe('update', () => {
        it('should change description', () => {
            return iugu.subscription.update(subscription, {
                expires_at: new Date(new Date().getTime() + 86400000 * 7)
            }).then(s => {
                expect(s).to.be.not.null.and.not.undefined
                expect(s.id).to.be.equal(subscription.id)
                expect(s.expires_at).to.be.not.undefined
                if (s.expires_at) {
                    expect(s.expires_at.getTime()).to.be.gte(new Date().getTime() + 86400000 * 6).and.lte(new Date().getTime() + 86400000 * 7)
                }
            })
        })

        it('should fail with an invalid id', () => {
            return expect(iugu.subscription.update('', {})).to.be.rejectedWith(Error, 'invalid_id');
        })
    })

    describe('get', () => {
        it('should resolve to a valid subscription', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return iugu.subscription.get(subscription).then(s => {
                expect(s).to.be.not.null
                expect(s.id).to.be.not.empty
                expect(s.id).to.be.equal(subscription.id)
            })
        })

        it('should fail with an invalid id', () => {
            return expect(iugu.subscription.get('')).to.be.rejectedWith(Error, 'invalid_id');
        })
    })

    describe('list', () => {
        it('should return at least one subscription', () => {
            return iugu.subscription.list().begin().then(l => {
                expect(l).to.be.not.null.and.not.undefined.and.not.empty
                expect(l.items).to.be.not.empty
                expect(l.totalItems).to.be.gte(1)
            })
        })
    })

    describe('delete', () => {
        it('should delete the created Subscription', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            if (subscription && subscription.id) {
                return expect(iugu.subscription.delete(subscription.id)).to.be.fulfilled
            }
        })

        it('should fail with an invalid id', () => {
            return expect(iugu.subscription.delete('')).to.be.rejectedWith(Error, 'invalid_id');
        })
    })
})
