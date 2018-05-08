const minimist = require('minimist')

module.exports = (opts = {}) => {
  const argv = minimist(process.argv.slice(2), {
    boolean: [
      'help',
      'version',
    ],
    alias: {
      config: ['c'],
      help: ['h'],
      version: ['v'],
      name: ['n'],
    },
  })

  argv.cmd = argv.version || argv.v
    ? 'version'
    : argv.help || argv.h || !argv._[0]
      ? 'help'
      : argv._[0]

  return argv
}
