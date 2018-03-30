import test from 'ava'
import sinon from 'sinon'
import * as emit from './emit'

test.beforeEach(t => {
  t.context.write = process.stdout.write
  process.stdout.write = sinon.spy()
})

test.afterEach(t => {
  process.stdout.write = t.context.write
})

test('log', t => {
  emit.default.log('foo bar', true)
  t.true(process.stdout.write.calledWith('foo bar\n'))
})
