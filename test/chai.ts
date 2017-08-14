import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import * as sinonChai from 'sinon-chai'

chai.use(chaiAsPromised)
chai.use(sinonChai)
chai.should()

export const expect = chai.expect
export const should = chai.should
export const timeout = 5000
