import chalk from 'chalk'
import { parseArgv } from './utils/arguments'
import { version } from '../package.json'

export default async function () {
  const args = parseArgv()

  // show gitdocs version
  if (args.version) {
    return console.log(`v${version}`)
  }

  try {
    // pull in module for the command
    const module = require(`./cmds/${args.mainCmd}`)

    // run the command, or show the help menu
    args.help || args.mainCmd === 'help'
      ? console.log(module.menu)
      : await module.default(args)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      err = `"${args.mainCmd}" is not a valid gitdocs command`
    }

    console.log(chalk.red('Error:', err.message || err))
  }
}
