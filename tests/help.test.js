import test from 'ava'
import { run, logSpy, logSpyRestore } from './helpers'

test.beforeEach(logSpy)
test.afterEach(logSpyRestore)

test('defaults to help command', async t => {
  await run('gitdocs')
  t.true(t.context.log.calledWithMatch(/gitdocs/))
})

test('shows help menu with command', async t => {
  await run('gitdocs help')
  t.true(t.context.log.calledWithMatch(/gitdocs/))
})

test('shows help submenu with command', async t => {
  await run('gitdocs help start')
  t.true(t.context.log.calledWithMatch(/gitdocs start/))
})

test('shows help submenu with flag', async t => {
  await run('gitdocs start -h')
  t.true(t.context.log.calledWithMatch(/gitdocs start/))
})
