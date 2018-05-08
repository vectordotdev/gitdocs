const { styles, chars } = require('../utils/emit')

const mainMenu = `
  ${chars.LOGO}

  ${styles.title('Usage')}

    gitdocs <command> [options]

    ${styles.subnote('for further info about a command:')}
    gitdocs <command> --help ${styles.subnote('or')} gitdocs help <command>

  ${styles.title('Commands')}

    init ${styles.inactive('....................')} initialize a new project
    serve ${styles.inactive('...................')} runs the local development server
    build ${styles.inactive('...................')} creates a static production bundle
    help ${styles.inactive('....................')} show the help menu for a command

  ${styles.title('Options')}

    --config, -c ${styles.inactive('............')} customize the config file location
    --help, -h ${styles.inactive('..............')} display the usage menu for a command
    --version, -v ${styles.inactive('...........')} show the version number`

module.exports = async (args, config) => {
  const defaultSubCmd = 'help'
  const subCmd = args._[0] === 'help'
    ? args._[1] || defaultSubCmd
    : args._[0] || defaultSubCmd

  try {
    const module = require(`./${subCmd}`)
    console.log(module.menu || mainMenu)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      throw new Error(`"${subCmd}" does not have a help menu!`)
    }
    throw err
  }
}
