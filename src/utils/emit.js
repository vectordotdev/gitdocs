import chalk from 'chalk'

export function log (msg) {
  process.stdout.write(msg)
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
