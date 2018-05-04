import getArguments from './utils/arguments'
import getConfig from './utils/config'
import { error } from './utils/emit'

export default async function () {
  try {
    const args = getArguments()
    const config = await getConfig(args.config)

    switch (args.cmd) {
      case 'init':
        await require('./cmds/init').default(args, config)
        break

      case 'serve':
        await require('./cmds/serve').default(args, config)
        break

      case 'build':
        await require('./cmds/build').default(args, config)
        break

      case 'version':
        await require('./cmds/version').default(args, config)
        break

      case 'help':
        await require('./cmds/help').default(args, config)
        break

      default:
        throw new Error(`"${args._[0]}" is not a valid gitdocs command`)
    }
  } catch (err) {
    error(err, true)
  }
}
