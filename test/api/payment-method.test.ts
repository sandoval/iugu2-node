// tslint:disable:no-unused-expression
import { expect, should } from '../chai'
import { token } from '../token'

import { ITestCallbackContext } from 'mocha'

import { Iugu } from '../../src'
import { CustomerAPI } from '../../src/api/customer'
import { PaymentMethodAPI } from '../../src/api/customer/payment-method'

describe('PaymentMethodAPI', () => {
    let iugu: Iugu

    before('initializing Iugu class', () => {
        iugu = new Iugu(token)
    })

    describe('#constructor', () => {
        it('should return a valid instance', () => {
            expect(iugu.customer.paymentMethod).to.be.not.null
            expect(iugu.customer.paymentMethod).to.be.instanceOf(PaymentMethodAPI)
        })
    })
})
