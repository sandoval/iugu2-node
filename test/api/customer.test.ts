/**
 * @file tests for the CustomerAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

// tslint:disable:no-unused-expression
import { expect, should, timeout } from '../chai'
import { token } from '../token'

import { ITestCallbackContext } from 'mocha'

import { Iugu } from '../../src'
import { CustomerAPI } from '../../src/api/customer'
import { Customer } from '../../src/interfaces/customer'

import { PagedRequest } from '../../src/http/paged-request'
import { Request } from '../../src/http/request'

describe('CustomerAPI', () => {
    let iugu: Iugu
    let customer: Customer

    before('initializing Iugu class', () => {
        iugu = new Iugu(token)
        customer = {
            name: 'Bruno Ferreira',
            email: 'shirayuki@kitsune.com.br'
        }
    })

    describe('#constructor', () => {
        it('should return a valid instance', () => {
            expect(iugu.customer).to.be.not.null
            expect(iugu.customer).to.be.instanceOf(CustomerAPI)
        })
    })

    describe('list', () => {
        let request: PagedRequest<void, Customer>
        before('initializing basic request', () => {
            request = iugu.customer.list()
        })

        it('should return a non-null request', () => {
            expect(request).to.be.not.null
        })

        it('should add a valid authorization header', () => {
            let header = request.getHeader('authorization')
            expect(header).to.be.not.undefined
            expect(header).to.be.equal(iugu.getAuthorizationHeader())
        })

        it('should make a valid request', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            let page = request.requestPage()
            page.should.eventually.be.fulfilled
            page.should.eventually.have.property('totalItems')
            page.should.eventually.have.property('items')
                .that.length.is.gte(0)
        })
    })

    describe('get', () => {
        let request: Promise<Customer>
        before('initializing basic request', () => {
            request = iugu.customer.get('123')
        })

        it('should return a non-null request', () => {
            expect(request).to.be.not.null
        })

        it('should make an invalid request', () => {
            return expect(request).to.be.rejected
        })
    })

    describe('create', () => {
        let request: Promise<Customer>

        before('initializing basic request', () => {
            request = iugu.customer.create(customer)
        })

        it('should return a non-null request', () => {
            expect(request).to.be.not.null
        })

        it('should make a valid request', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return request.then(c => {
                expect(c).to.not.be.null
                expect(c).to.haveOwnProperty('id')
                expect(c).to.haveOwnProperty('created_at')
                expect(c).to.haveOwnProperty('updated_at')
                customer = c
            })
        })

        it('should fail with an existing customer', () => {
            request = iugu.customer.create(customer)
            return expect(request).to.be.rejectedWith(Error)
        })
    })

    describe('get', () => {
        let request: Promise<Customer>

        before('initializing basic request', () => {
            request = iugu.customer.get(<string>customer.id)
        })

        it('should return a non-null request', () => {
            expect(request).to.be.not.null
        })

        it('should make a valid request', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return request.then(c => {
                expect(c).to.not.be.null
                expect(c).to.haveOwnProperty('id')
                expect(c).to.haveOwnProperty('created_at')
                expect(c).to.haveOwnProperty('updated_at')
                expect(<string>c.id).to.be.equal(<string>customer.id)
            })
        })

        it('should fail without an id', () => {
            request = iugu.customer.get('')
            return expect(request).to.be.rejectedWith(Error)
        })
    })

    describe('update', () => {
        let request: Promise<Customer>
        let random: number

        before('initializing basic request', () => {
            random = Math.floor(Math.random() * 1000)
            let toChange: Customer = {
                id: customer.id,
                custom_variables: [
                    {
                        name: 'automated_test',
                        value: random.toFixed(0)
                    }
                ]
            }

            request = iugu.customer.update(toChange)
        })

        it('should change custom variables and updated_at', () => {
            return request.then(c => {
                expect(c).to.be.not.null
                expect(c.id).to.be.equal(customer.id)
                expect(c).to.haveOwnProperty('custom_variables')
                if (c.custom_variables) { // Always true (see above assertion), used to make pass TS strict checks
                    expect(c.custom_variables.length).to.be.equal(1)
                    expect(c.custom_variables[0].name).to.be.equal('automated_test')
                    expect(c.custom_variables[0].value).to.be.equal(random.toFixed(0))
                }
            })
        })

        it('should fail without an id', () => {
            request = iugu.customer.update({})

            return expect(request).to.be.rejectedWith(Error)
        })
    })

    describe('delete', () => {
        let request: Promise<void>

        before('initializing basic request', () => {
            request = iugu.customer.delete(<string>customer.id)
        })

        it('should return a non-null request', () => {
            expect(request).to.be.not.null
        })

        it('should make a valid request', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return request
        })

        it('should fail without an id', () => {
            request = iugu.customer.delete('')

            return expect(request).to.be.rejectedWith(Error)
        })
    })
})
