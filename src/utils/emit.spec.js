import test from 'ava'
import sinon from 'sinon'
// import * as emit from './emit'

test.beforeEach(t => {
  t.context.write = process.stderr.write
  process.stderr.write = sinon.spy()
})

test.afterEach(t => {
  process.stderr.write = t.context.write
})

test.todo('all')
