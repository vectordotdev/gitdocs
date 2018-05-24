const getArguments = require('./utils/arguments')
const { getConfig } = require('./utils/config')
const { error } = require('./utils/emit')

module.exports = async () => {
  try {
    const args = getArguments()
    const config = await getConfig(args.config)

    switch (args.cmd) {
      case 'init':
        await require('./cmds/init')(args, config)
        break

      case 'serve':
      case 'start':
        await require('./cmds/serve')(args, config)
        break

      case 'build':
        await require('./cmds/build')(args, config)
        break

      case 'manifest':
        await require('./cmds/manifest')(args, config)
        break

      case 'version':
        await require('./cmds/version')(args, config)
        break

      case 'help':
        await require('./cmds/help')(args, config)
        break

      default:
        throw new Error(`"${args._[0]}" is not a valid gitdocs command`)
    }
  } catch (err) {
    error(err, true)
  }
}
