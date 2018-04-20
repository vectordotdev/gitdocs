import test from 'ava'
import sinon from 'sinon'
import * as emit from './emit'

test.beforeEach(t => {
  t.context.write = process.stderr.write
  process.stderr.write = sinon.spy()
})

test.afterEach(t => {
  process.stderr.write = t.context.write
})

test('log', t => {
  emit.log('foo bar')
  t.true(process.stderr.write.calledWith('  foo bar\n'))
})

test.todo('warn')

test.todo('error')
