import chalk from 'chalk'
import Progress from 'progress'

const CHAR_PAD = '  '
const CHAR_BAR = '\u2501'

export function log (msg) {
  process.stdout.write(`${CHAR_PAD}${msg}\n`)
}

export function warn (msg) {
  process.stderr.write(chalk.yellow(`Warning: ${msg}\n`))
}

export function error (err, exit) {
  err.name !== 'Error' && err.stack
    ? process.stderr.write(chalk.dim(err.stack))
    : process.stderr.write(chalk.red(err.message || err))

  exit && process.exit(1)
}

export function progress (total, bar) {
  return new Progress(`${CHAR_PAD}${bar}`, {
    total,
    width: 25,
    incomplete: chalk.dim.gray(CHAR_BAR),
    complete: chalk.blue(CHAR_BAR),
  })
}
