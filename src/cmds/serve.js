const core = require('../core')
const startServer = require('../core/server')
const { styles, log, fullScreen } = require('../utils/emit')

module.exports = async (args, config) => {
  fullScreen()
  log('Starting local development server', true)

  const {
    props,
    compiler,
  } = await core('development', config)

  const server = await startServer(props, compiler)
  log(`[\u2713] Docs are live at ${styles.url(server.url)}`)
}

module.exports.menu = `
  ${styles.title('Usage')}

    gitdocs serve [options]
    ${styles.subnote('or gitdocs start')}

  ${styles.title('Options')}

    ${styles.subnote('no options yet')}
`
