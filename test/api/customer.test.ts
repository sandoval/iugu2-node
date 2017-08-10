// tslint:disable:no-unused-expression
import { expect, should } from '../chai'
import { token } from '../token'

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

        it('should make a non-null request', () => {
            expect(request).to.be.not.null
        })

        it('should add a valid authorization header', () => {
            let header = request.getHeader('authorization')
            expect(header).to.be.not.undefined
            expect(header).to.be.equal(iugu.getAuthorizationHeader())
        })

        it('should make a valid request', () => {
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

        it('should make a non-null request', () => {
            expect(request).to.be.not.null
        })

        it('should make an invalid request', () => {
            expect(request).to.be.rejected
        })
    })

    describe('create', () => {
        let request: Promise<Customer>

        before('initializing basic request', () => {
            request = iugu.customer.create(customer)
        })

        it('should make a non-null request', () => {
            expect(request).to.be.not.null
        })

        it('should make a valid request', () => {
            return request.then(c => {
                expect(c).to.not.be.null
                expect(c).to.haveOwnProperty('id')
                expect(c).to.haveOwnProperty('created_at')
                expect(c).to.haveOwnProperty('updated_at')
                customer = c
            })
        })
    })

    describe('get', () => {
        let request: Promise<Customer>

        before('initializing basic request', () => {
            request = iugu.customer.get(<string>customer.id)
        })

        it('should make a non-null request', () => {
            expect(request).to.be.not.null
        })

        it('should make a valid request', () => {
            return request.then(c => {
                expect(c).to.not.be.null
                expect(c).to.haveOwnProperty('id')
                expect(c).to.haveOwnProperty('created_at')
                expect(c).to.haveOwnProperty('updated_at')
                expect(<string>c.id).to.be.equal(<string>customer.id)
            })
        })
    })

    describe('delete', () => {
        let request: Promise<void>

        before('initializing basic request', () => {
            request = iugu.customer.delete(<string>customer.id)
        })

        it('should make a non-null request', () => {
            expect(request).to.be.not.null
        })

        it('should make a valid request', () => {
            return request
        })
    })
})
