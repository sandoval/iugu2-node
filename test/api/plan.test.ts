/**
 * @file tests for the PlanAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

// tslint:disable:no-unused-expression
import { expect, should, timeout } from '../chai'
import { token } from '../token'
import { customerDefaults, planDefaults } from '../test-defaults'

import { ITestCallbackContext } from 'mocha'

import { Iugu } from '../../src'
import { PlanAPI } from '../../src/api/plan'
import { Plan, NewPlan } from '../../src/interfaces/plan'

describe('PlanAPI', () => {
    let iugu: Iugu
    let plan: Plan
    let planIdentifier: string

    before('initializing', () => {
        iugu = new Iugu(token)
        planIdentifier = 'test_plan_' + (Math.random() * 10000).toFixed(0)
    })

    describe('#constructor', () => {
        it('should return a valid instance', () => {
            expect(iugu.plan).to.be.not.null
            expect(iugu.plan).to.be.instanceOf(PlanAPI)
        })
    })

    describe('create', () => {
        it('should create a new Plan', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            let planData: NewPlan = Object.assign({ identifier: planIdentifier }, planDefaults)

            return iugu.plan.create(planData).then(p => {
                plan = p

                expect(p).to.be.not.null
                if (p) {
                    expect(p.id).to.be.not.empty
                    expect(p.identifier).to.be.equal('test_plan')
                }
            })
        })
    })

    describe('get', () => {
        it('should return a valid Plan', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            if (!plan || !plan.id) {
                throw new Error('invalid reference plan')
            }

            return iugu.plan.get(plan.id).then(p => {
                expect(p).to.not.be.null
                expect(p).to.haveOwnProperty('id')
                expect(<string>p.id).to.be.equal(<string>plan.id)
            })
        })

        it('should fail without a plan id', () => {
            return expect(iugu.plan.get('')).to.be.rejectedWith(Error)
        })
    })

    describe('getByIdentifier', () => {
        it('should return a valid Plan', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            if (!plan || !plan.identifier) {
                throw new Error('invalid reference plan')
            }

            return iugu.plan.getByIdentifier(plan.identifier).then(p => {
                expect(p).to.not.be.null
                expect(p).to.haveOwnProperty('id')
                expect(<string>p.id).to.be.equal(<string>plan.id)
            })
        })

        it('should fail without a plan identifier', () => {
            return expect(iugu.plan.getByIdentifier('')).to.be.rejectedWith(Error)
        })
    })

    describe('update', () => {
        it('should change name', () => {
            return iugu.plan.update({
                id: plan.id,
                name: 'Definitive Plan'
            }).then(p => {
                expect(p).to.be.not.null
                expect(p.identifier).to.be.equal(plan.identifier)
                expect(p.name).to.be.equal('Definitive Plan')
            })
        })

        it('should fail without an id', () => {
            return expect(iugu.plan.update({})).to.be.rejectedWith(Error)
        })
    })

    describe('list', () => {
        it('should make a valid request', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            return iugu.plan.list().requestPage().then(page => {
                expect(page.totalItems).to.be.gt(0)
                expect(page.items.length).to.be.gt(0)
            })
        })
    })

    describe('delete', () => {
        it('should fail with an incorrect object', () => {
            return expect(iugu.plan.delete('')).to.be.rejected
        })

        it('should delete the created Plan', function (this: ITestCallbackContext) {
            this.timeout(timeout)

            if (plan && plan.id) {
                return expect(iugu.plan.delete(plan.id)).to.be.fulfilled
            }

            throw new Error('invalid plan')
        })
    })
})
