import chalk from 'chalk'
import Progress from 'progress'
import exitHook from 'exit-hook'

export const styles = {
  info: chalk,
  note: chalk.magenta,
  subnote: chalk.dim.italic,
  title: chalk.bold.underline,
  url: chalk.magenta.underline,
  warn: chalk.yellow.bold,
  error: chalk.dim.bold,
  critical: chalk.red.bold,
  inactive: chalk.dim,
  header: chalk.inverse.bold,
}

export const CHAR_BAR = '\u2501'
export const CHAR_PRE = styles.inactive('\u276F')
export const LOGO = styles.header('    GitDocs    ')

export function hideCursor () {
  process.stderr.write('\u001b[?25l')
  exitHook(() => process.stderr.write('\u001b[?25h'))
}

export function fullScreen () {
  process.stderr.write('\x1Bc')

  hideCursor()
  process.stderr.write(`\n  ${LOGO}\n`)
}

export function log (msg, firstLine) {
  const pre = `${firstLine ? '\n' : ''}${CHAR_PRE}`
  process.stdout.write(styles.info(`${pre} ${msg}\n`))
}

export function warn (msg) {
  process.stderr.write(styles.warn(`Warning: ${msg}\n`))
}

export function error (err, exit) {
  const pre = styles.critical(CHAR_PRE)
  err.name !== 'Error' && err.stack
    ? process.stderr.write(`${pre} ${styles.error(err.stack)}`)
    : process.stderr.write(`${pre} ${styles.critical(err.message || err)}`)

  exit && process.exit(1)
}

export function progress (opts = {}) {
  const prepend = opts.prepend ? `${opts.prepend}  ` : ''
  const append = opts.append ? `  ${opts.append}` : ''
  const bar = styles.info(`  ${prepend}:bar${append}`)

  const progressBar = new Progress(bar, {
    width: Math.floor(process.stdout.columns / 3),
    incomplete: styles.inactive(CHAR_BAR),
    complete: CHAR_BAR,
    total: (opts.total || 0) + 1,
    clear: opts.clear,
  })

  // make sure it shows up immediately
  progressBar.tick()

  return progressBar
}

