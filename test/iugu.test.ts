// tslint:disable:no-unused-expression
import { expect, should } from './chai'
import { token } from './token'
import { Iugu } from '../src'
import { Request } from '../src/http/request'

describe('Iugu', () => {
    let iugu: Iugu

    before('initializing Iugu class', () => {
        iugu = new Iugu(token)
    })

    describe('#constructor', () => {
        it('should return a valid instance', () => {
            expect(iugu).to.be.not.null
            expect(iugu).to.be.instanceOf(Iugu)
        })
    })

    describe('#get#token', () => {
        it('should be the same value passed to constructor', () => {
            expect(iugu.apiToken).to.equal(token)
        })
    })

    describe('getAuthorizationHeader', () => {
        it('should return the correct header string', () => {
            // Force iugu token to a known value (ignore ENV value)
            const iuguKnown = new Iugu('token123')

            expect(iuguKnown.getAuthorizationHeader()).to.equal('Basic dG9rZW4xMjM6')
        })
    })

    describe('makeRequest', () => {
        let request: Request<any, any>
        before('initializing basic request', () => {
            request = iugu.makeRequest<any>('GET', '/')
        })

        it('should make a non-null request', () => {
            expect(request).to.be.not.null
        })

        it('should add a valid authorization header', () => {
            let header = request.getHeader('authorization')
            expect(header).to.be.not.undefined
            expect(header).to.be.equal(iugu.getAuthorizationHeader())
        })

        it('should make an invalid request', () => {
            request.begin({}).should.eventually.throw
        })
    })
})
