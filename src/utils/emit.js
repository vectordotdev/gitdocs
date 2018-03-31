import chalk from 'chalk'

function log (msg, bottomPad) {
  process.stdout.write(`${msg}${bottomPad ? '\n' : ''}`)
}

function warn (msg) {
  process.stderr.write(chalk.yellow(`Warning: ${msg}\n`))
}

function error (err, exit) {
  err.name !== 'Error' && err.stack
    ? process.stderr.write(chalk.dim(err.stack))
    : process.stderr.write(chalk.red(err.message || err))

  exit && process.exit(1)
}

export default {
  log,
  warn,
  error
}
