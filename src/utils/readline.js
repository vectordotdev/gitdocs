import readline from 'readline'
import { CHAR_PRE, styles } from './emit'

const _getInterface = () =>
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

function _getQuestion (q, hint) {
  return `${CHAR_PRE} ${q}${hint ? styles.inactive(` (${hint})`) : ''} `
}

export function ask (question, opts = {}) {
  return new Promise((resolve, reject) => {
    const iface = _getInterface()
    const message = _getQuestion(question, opts.default)

    iface.question(message, answer => {
      iface.close()
      resolve(answer || opts.default)
    })
  })
}

export function confirm (question, opts = {}) {
  return new Promise((resolve, reject) => {
    const iface = _getInterface()
    const message = _getQuestion(question, 'y/n')

    iface.question(message, answer => {
      iface.close()
      resolve(/^y/i.test(answer || opts.default))
    })
  })
}
