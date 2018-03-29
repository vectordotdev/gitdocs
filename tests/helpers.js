import sinon from 'sinon'
import gitdocs from '../src'

export async function run (cmd) {
  const argv = cmd.split(' ')
  argv.unshift('')

  process.argv = argv
  await gitdocs()
}

export function logSpy (t) {
  t.context.log = sinon.spy()
  t.context.logOrig = console.log

  console.log = t.context.log
}

export function logSpyRestore (t) {
  console.log = t.context.logOrig
}
