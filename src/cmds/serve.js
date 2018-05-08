const getManifest = require('../core/manifest')
const getCompiler = require('../core/compiler')
const startServer = require('../core/server')
const getExternals = require('../core/externals')
const { styles, log, progress, fullScreen } = require('../utils/emit')

module.exports = async (args, config) => {
  fullScreen()
  log('Starting local development server', true)

  const env = 'development'
  const externals = await getExternals(config)
  const manifest = await getManifest(env, config)
  const bar = progress({ total: 100, clear: true })

  const props = {
    config,
    manifest,
  }

  const compiler = await getCompiler(env, props)
  compiler.onProgress(i => bar.tick(i))

  const server = await startServer(env, compiler, props)
  log(`We are live at ${styles.url(server.url)}`)
}

module.exports.menu = `
  ${styles.title('Usage')}

    gitdocs serve [options]

  ${styles.title('Options')}

    ${styles.subnote('no options yet')}`
