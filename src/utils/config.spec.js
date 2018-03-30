import test from 'ava'
import * as config from './config'

test('default', t => {
  const { get, save } = config.default()
  t.is(typeof get, 'function')
  t.is(typeof save, 'function')
})
