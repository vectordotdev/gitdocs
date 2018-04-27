import test from 'ava'
import * as argv from './arguments'

test('version', t => {
  process.argv = ['', '', '-v']
  const res = argv.default()
  t.true(res.v)
  t.true(res.version)
  t.is(res.cmd, 'version')
})

test('version boolean', t => {
  process.argv = ['', '', '--version', 'foo']
  const res = argv.default()
  t.is(res.version, true)
})

test('help', t => {
  process.argv = ['', '', '-h']
  const res = argv.default()
  t.true(res.h)
  t.true(res.help)
  t.is(res.cmd, 'help')
})

test('help command', t => {
  process.argv = ['', '', 'foo', '-h']
  const res = argv.default()
  t.is(res.cmd, 'help')
})

test('default to help', t => {
  process.argv = ['', '']
  const res = argv.default()
  t.is(res.cmd, 'help')
})

test('command', t => {
  process.argv = ['', '', 'foo', 'bar']
  const res = argv.default()
  t.is(res.cmd, 'foo')
})
