import { expect } from './expect'
import { Iugu } from '../src'

const token = 'token123'

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
})
