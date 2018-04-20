import chalk from 'chalk'
import Progress from 'progress'

const CHAR_PAD = '  '
const CHAR_BAR = '\u2501'

export function log (msg) {
  process.stderr.write(`${CHAR_PAD}${msg}\n`)
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

export function hideCursor () {
  process.stderr.write('\u001b[?25l')
}

export function showCursor () {
  process.stderr.write('\u001b[?25h')
}

export function progress (total, bar) {
  hideCursor()

  return new Progress(`${CHAR_PAD}${bar || ':bar'}`, {
    total,
    width: Math.floor(process.stdout.columns / 3),
    incomplete: chalk.dim.gray(CHAR_BAR),
    complete: chalk.blue(CHAR_BAR),
    callback: showCursor,
  })
}
