const chalk = require('chalk')
const Progress = require('progress')
const exitHook = require('exit-hook')

const styles = {
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

const chars = {
  CHAR_BAR: '\u2501',
  CHAR_PRE: styles.inactive('\u276F'),
  LOGO: styles.header('    GitDocs    '),
}

function hideCursor () {
  process.stderr.write('\u001b[?25l')
  exitHook(() => process.stderr.write('\u001b[?25h'))
}

function fullScreen () {
  process.stderr.write('\x1Bc')

  hideCursor()
  process.stderr.write(`\n  ${chars.LOGO}\n`)
}

function log (msg, firstLine) {
  const pre = `${firstLine ? '\n' : ''}${chars.CHAR_PRE}`
  process.stdout.write(styles.info(`${pre} ${msg}\n`))
}

function warn (msg) {
  const pre = styles.warn(chars.CHAR_PRE)
  process.stderr.write(`${pre} ${styles.warn(`Warning: ${msg}\n`)}`)
}

function error (err, exit) {
  const pre = styles.critical(chars.CHAR_PRE)
  err
    ? err.name !== 'Error' && err.stack
      ? process.stderr.write(`${pre} ${styles.error(err.stack)}`)
      : process.stderr.write(`${pre} ${styles.critical(err.message || err)}`)
    : process.stderr.write(`${pre} ${styles.critical('An unknown error occurred!')}`)

  exit && process.exit(1)
}

function progress (opts = {}) {
  const prepend = opts.prepend ? `${opts.prepend}  ` : ''
  const append = opts.append ? `  ${opts.append}` : ''
  const bar = styles.info(`  ${prepend}:bar${append}`)

  const progressBar = new Progress(bar, {
    width: Math.floor(process.stdout.columns / 3),
    incomplete: styles.inactive(chars.CHAR_BAR),
    complete: chars.CHAR_BAR,
    total: (opts.total || 0) + 1,
    clear: opts.clear,
  })

  // make sure it shows up immediately
  progressBar.tick()

  return progressBar
}

function hijackConsole () {
  const _log = console.log
  const _warn = console.warn
  const _error = console.error

  console.log = log
  console.warn = warn
  console.error = error

  return {
    restore: () => {
      console.log = _log
      console.warn = _warn
      console.error = _error
    },
  }
}

module.exports = {
  styles,
  chars,
  hideCursor,
  fullScreen,
  log,
  warn,
  error,
  progress,
  hijackConsole,
}
