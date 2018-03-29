import test from 'ava'
import { run, logSpy, logSpyRestore } from './helpers'

test.beforeEach(logSpy)
test.afterEach(logSpyRestore)

test('defaults to help command', async t => {
  await run('gitdocs foobar')
  t.true(t.context.log.calledWithMatch(/not a valid/))
})

test('shows package version', async t => {
  await run('gitdocs -v')
  t.true(t.context.log.calledWithMatch(/v[0-9]/))
})
