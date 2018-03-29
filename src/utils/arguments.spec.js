import test from 'ava'
import * as argv from './arguments'

test('parseArgv', t => {
  process.argv = ['', '', '-v']
  t.true(argv.parseArgv().v)
  t.true(argv.parseArgv().version)
  process.argv = ['', '', '-h']
  t.true(argv.parseArgv().help)
  process.argv = ['', '', 'foo', 'bar']
  t.is(argv.parseArgv().mainCmd, 'foo')
  process.argv = ['', '']
  t.is(argv.parseArgv().mainCmd, 'help')
})
