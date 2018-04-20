import test from 'ava'
import { run } from './helpers'

test('defaults to help command', async t => {
  const res = await run()
  t.regex(res.stderr, /usage/)
})

test('throws on invalid command', async t => {
  const res = await run('foobar', true)
  t.is(res.code, 1)
  t.regex(res.stderr, /not a valid/)
})

test('shows package version', async t => {
  const res = await run('-v')
  t.regex(res.stderr, /v[0-9]/)
})
