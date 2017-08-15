/**
 * @file tests for the PaymentMethodAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

// tslint:disable:no-unused-expression
import { expect, should, timeout } from '../chai'
import { token } from '../token'
import { customerDefaults, paymentTokenDefaults } from '../test-defaults'

import { ITestCallbackContext } from 'mocha'

import { Iugu } from '../../src'
import { CustomerAPI } from '../../src/api/customer'
import { PaymentMethodAPI } from '../../src/api/customer/payment-method'

import { Customer } from '../../src/interfaces/customer'
import { PaymentMethod, NewPaymentMethod } from '../../src/interfaces/payment-method'

describe('PaymentMethodAPI', () => {
    let iugu: Iugu
    let customer: Customer
    const newPaymentMethod: NewPaymentMethod = {
        description: 'Some nice description',
        token: 'TOKEN123456'
    }
    let paymentMethod: PaymentMethod

    before('initializing', () => {
        iugu = new Iugu(token)

        // Create a new Customer, so we can fiddle with it
        return iugu.customer.create(customerDefaults).then(c => {
            customer = c
        })
    })

    after('cleanup', () => {
        if (customer && customer.id) {
            return iugu.customer.delete(customer.id)
        }
    })

    describe('#constructor', () => {
        it('should return a valid instance', () => {
            expect(iugu.customer.paymentMethod).to.be.not.null
            expect(iugu.customer.paymentMethod).to.be.instanceOf(PaymentMethodAPI)
        })
    })

    describe('create', () => {
        describe('test customerParamToString', () => {
            it('should fail with an incorrect object', () => {
                return expect(iugu.customer.paymentMethod.create({}, newPaymentMethod)).to.be.rejected
            })

            it('should fail with an object with an empty id', () => {
                return expect(iugu.customer.paymentMethod.create({
                    id: ''
                }, newPaymentMethod)).to.be.rejected
            })

            it('should fail with an empty string', () => {
                return expect(iugu.customer.paymentMethod.create('', newPaymentMethod)).to.be.rejected
            })
        })

        it('should create a new PaymentToken', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return iugu.paymentToken.create({
                account_id: iugu.accountID,
                method: 'credit_card',
                test: true,
                data: paymentTokenDefaults
            }).then(p => {
                if (p.id) {
                    newPaymentMethod.token = p.id
                }

                expect(p).to.be.not.null
                if (p) {
                    expect(p.id).to.be.not.empty
                    expect(p.method).to.be.equal('credit_card')
                    if (p.extra_info) {
                        expect(p.extra_info.brand).to.be.equal('American Express')
                    }
                }
            })
        })

        it('should create a new PaymentMethod', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return iugu.customer.paymentMethod.create(customer, newPaymentMethod).then(p => {
                paymentMethod = p

                expect(p).to.be.not.null
                expect(p.id).to.be.not.empty
                expect(p.description).to.be.equal('Some nice description')
            })
        })
    })

    describe('get', () => {
        it('should make a valid request', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return iugu.customer.paymentMethod.get(customer, <string>paymentMethod.id).then(method => {
                expect(method).to.not.be.null
                expect(method).to.haveOwnProperty('id')
                expect(<string>method.id).to.be.equal(<string>paymentMethod.id)
                if (method.data) {
                    expect(<string>method.data.brand).to.be.equal('American Express')
                }
            })
        })

        it('should fail without a customer id', () => {
            return expect(iugu.customer.paymentMethod.get('', '')).to.be.rejectedWith(Error)
        })

        it('should fail without a payment method id', () => {
            return expect(iugu.customer.paymentMethod.get(customer, '')).to.be.rejectedWith(Error)
        })
    })

    describe('list', () => {
        it('should make a valid request', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return iugu.customer.paymentMethod.list(customer).then(methods => {
                expect(methods).to.be.not.null
                expect(methods.length).to.be.equal(1)
                expect(methods[0].id).to.be.equal(paymentMethod.id)
            })
        })

        it('should fail without a customer id', () => {
            return expect(iugu.customer.paymentMethod.list('')).to.be.rejectedWith(Error)
        })
    })

    describe('update', () => {
        it('should change description', () => {
            return iugu.customer.paymentMethod.update(customer, {
                id: paymentMethod.id,
                description: 'Some new description'
            }).then(pm => {
                expect(pm).to.be.not.null
                expect(pm.id).to.be.equal(paymentMethod.id)
                expect(pm.description).to.be.equal('Some new description')
            })
        })

        it('should fail without a customer id', () => {
            return expect(iugu.customer.paymentMethod.update('', {})).to.be.rejectedWith(Error)
        })

        it('should fail without a payment method id', () => {
            return expect(iugu.customer.paymentMethod.update(customer, {})).to.be.rejectedWith(Error)
        })
    })

    describe('delete', () => {
        it('should fail with an incorrect object', () => {
            return expect(iugu.customer.paymentMethod.delete({}, '')).to.be.rejected
        })

        it('should delete the created PaymentMethod', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            if (paymentMethod && paymentMethod.id) {
                return expect(iugu.customer.paymentMethod.delete(customer, paymentMethod.id)).to.be.fulfilled
            }

            throw new Error('invalid payment method')
        })
    })
})
