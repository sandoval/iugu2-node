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

        it('should create instance with no parameter', () => {
            const localIugu = new Iugu()
            expect(localIugu).to.be.not.null
            expect(localIugu.apiToken).to.be.equal(iugu.apiToken)
        })

        it('should create instance with account id', () => {
            const localIugu = new Iugu(token, process.env.IUGU_ACCOUNTID)
            expect(localIugu).to.be.not.null
            expect(localIugu.apiToken).to.be.equal(iugu.apiToken)
            expect(localIugu.accountID).to.be.equal(iugu.accountID)
        })

        it('should throw with no parameter and no env', () => {
            delete process.env.IUGU_TOKEN
            return expect(() => { return new Iugu() }).to.throw()
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
