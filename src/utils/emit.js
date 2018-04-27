import chalk from 'chalk'
import Progress from 'progress'

const CHAR_PRE = '\u276F'
const CHAR_BAR = '\u2501'

const STYLES = {
  info: chalk.blue,
  warn: chalk.yellow,
  error: chalk.dim,
  critical: chalk.red,
  inactive: chalk.dim,
}

export function hideCursor () {
  process.stderr.write('\u001b[?25l')
}

export function showCursor () {
  process.stderr.write('\u001b[?25h')
}

export function log (msg, firstLine) {
  const pre = `${firstLine ? '\n' : ''}${CHAR_PRE}`
  process.stderr.write(STYLES.info(`${pre} ${msg}\n`))
}

export function warn (msg) {
  process.stderr.write(STYLES.warn(`Warning: ${msg}\n`))
}

export function error (err, exit) {
  err.name !== 'Error' && err.stack
    ? process.stderr.write(STYLES.error(err.stack))
    : process.stderr.write(STYLES.critical(err.message || err))

  exit && process.exit(1)
}

export function progress (opts = {}) {
  hideCursor()

  const text = opts.text ? `${opts.text} ` : ''
  const bar = STYLES.info(`${CHAR_PRE} ${text}:bar`)

  return new Progress(bar, {
    width: Math.floor(process.stdout.columns / 3),
    incomplete: STYLES.inactive(CHAR_BAR),
    complete: CHAR_BAR,
    total: opts.total || 0,
    clear: opts.clear,
    callback: showCursor,
  })
}

