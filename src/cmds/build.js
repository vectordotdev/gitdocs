const getManifest = require('../core/manifest')
const getCompiler = require('../core/compiler')
const outputStatic = require('../core/output')
const { styles, log, progress } = require('../utils/emit')

module.exports = async (args, config) => {
  log('Creating your documentation', true)

  const env = 'production'
  const manifest = await getManifest(env, config)

  const props = {
    config,
    manifest,
  }

  log('Bundling the Javascript app')

  const bundleBar = progress({ clear: true, total: 100 })
  const compiler = await getCompiler(env, props)
  compiler.onProgress(i => bundleBar.tick(i))

  const stats = await compiler.build()

  log('Rendering and outputting HTML pages')

  const outputBar = progress({
    clear: true,
    total: manifest.files.length,
    append: styles.inactive(':current/:total'),
  })

  const outputDir = await outputStatic(env, stats, props, () => outputBar.tick())

  log(`Site has been created at ${styles.note(`${outputDir}/`)}`)
}

module.exports.menu = `
  ${styles.title('Usage')}

    gitdocs build [options]

  ${styles.title('Options')}

    ${styles.subnote('no options yet')}`
