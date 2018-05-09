const runCore = require('../core')
const startServer = require('../core/server')
const { styles, log, progress, fullScreen } = require('../utils/emit')

module.exports = async (args, config) => {
  fullScreen()
  log('Starting local development server', true)

  const env = 'development'
  const bar = progress({ total: 100, clear: true })

  log('Bundling the Javascript app')

  const { props, compiler } = await runCore(env, config, bar)
  const server = await startServer(env, compiler, props)

  log(`We are live at ${styles.url(server.url)}`)
}

module.exports.menu = `
  ${styles.title('Usage')}

    gitdocs serve [options]
    ${styles.subnote('or gitdocs start')}

  ${styles.title('Options')}

    ${styles.subnote('no options yet')}
`
