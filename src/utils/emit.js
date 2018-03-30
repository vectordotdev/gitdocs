import chalk from 'chalk'

function log (msg, bottomPad) {
  process.stdout.write(`${msg}${bottomPad ? '\n' : ''}`)
}

function error (err, exit) {
  process.stderr.write(chalk.red('Error:', err.message || err))
  // err.stack && process.stderr.write(`\n${chalk.dim(err.stack)}`)
  exit && process.exit(1)
}

export default {
  log,
  error
}
