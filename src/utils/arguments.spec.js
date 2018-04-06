import test from 'ava'
import * as argv from './arguments'

test('default', t => {
  process.argv = ['', '', '-v']
  t.true(argv.default().v)
  t.true(argv.default().version)
  process.argv = ['', '', '-h']
  t.true(argv.default().help)
  process.argv = ['', '', 'foo', 'bar']
  t.is(argv.default().mainCmd, 'foo')
  process.argv = ['', '']
  t.is(argv.default().mainCmd, 'help')
})
