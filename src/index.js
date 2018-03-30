import emit from './utils/emit'
import getConfig from './utils/config'
import { parseArgv } from './utils/arguments'
import { version } from '../package.json'

export default async function () {
  const args = parseArgv()

  try {
    // create the config getter/setter functions
    const config = getConfig(args.directory)

    // show gitdocs version
    if (args.version) {
      return emit.log(`v${version}`)
    }

    // pull in module for the command
    const module = require(`./cmds/${args.mainCmd}`)

    // run the command, or show the help menu
    args.help || args.mainCmd === 'help'
      ? emit.log(module.menu, true)
      : await module.default(args, config)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      err = `"${args.mainCmd}" is not a valid gitdocs command`
    }

    emit.error(err, true)
  }
}
