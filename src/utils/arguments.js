import minimist from 'minimist'

export function parseArgv () {
  const argv = minimist(process.argv.slice(2), {
    boolean: [
      'help',
      'version'
    ],
    alias: {
      directory: ['d'],
      help: ['h'],
      version: ['v']
    }
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
