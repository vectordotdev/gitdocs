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
  t.true(process.stderr.write.calledWith('\u001b[34m❯ foo bar\u001b[39m\n\u001b[34m\u001b[39m'))
})

test.todo('warn')

test.todo('error')
