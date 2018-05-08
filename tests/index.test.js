const test = require('ava')
const { run } = require('./helpers')

test('defaults to help command', async t => {
  const res = await run()
  t.regex(res.stdout, /usage/)
})

test('shows package version', async t => {
  const res = await run('-v')
  t.regex(res.stdout, /v[0-9]/)
})

test('throws on invalid command', async t => {
  const res = await run('foobar', true)
  t.is(res.code, 1)
  t.regex(res.stderr, /not a valid/)
})
