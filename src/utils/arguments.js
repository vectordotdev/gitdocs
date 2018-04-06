import minimist from 'minimist'

export default function () {
  const argv = minimist(process.argv.slice(2), {
    boolean: [
      // all commands
      'help',
      'version',
    ],
    alias: {
      // all commands
      config: ['c'],
      help: ['h'],
      version: ['v'],
      // init command
      name: ['n'],
    },
  })

  // running `help <cmd>` works the same as `<cmd> --help`
  if (argv._[0] === 'help' && argv._[1]) {
    argv._ = [argv._[1]]
    argv.help = true
  }

  // find the main command used
  argv.mainCmd = argv._[0] || 'help'

  return argv
}
