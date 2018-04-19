import getConfig from './utils/config'
import getArguments from './utils/arguments'
import { log, error } from './utils/emit'
import { version } from '../package.json'

export default async function () {
  const args = getArguments()

  try {
    // create config getter/setter
    const config = await getConfig(args.config)

    // show gitdocs version
    if (args.version) {
      return log(`v${version}`)
    }

    // pull in module for the command
    const module = require(`./cmds/${args.mainCmd}`)

    // run the command, or show the help menu
    return args.help || args.mainCmd === 'help'
      ? log(`${module.menu}\n`)
      : await module.default(config, args)
  } catch (err) {
    return args.debug
      ? console.error(err)
      : err.code === 'MODULE_NOT_FOUND'
        ? error(`"${args.mainCmd}" is not a valid gitdocs command`, true)
        : error(err, true)
  }
}
