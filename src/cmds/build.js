const fs = require('fs-extra')
const runCore = require('../core')
const outputStatic = require('../core/output')
const { styles, log, progress } = require('../utils/emit')

module.exports = async (args, config) => {
  log('Creating your documentation site', true)

  const env = 'production'
  const bundleBar = progress({ clear: true, total: 100 })

  log('[\u2713] Bundling the Javascript app')

  await fs.emptyDir(config.output)
  const { props, compiler } = await runCore(env, config, bundleBar)
  const stats = await compiler.build()

  log('Rendering and outputting HTML pages')

  const outputBar = progress({
    clear: true,
    total: props.manifest.files.length,
    append: styles.inactive(':current/:total'),
  })

  const outputDir = await outputStatic(env, stats, props, outputBar)

  log(`Site has been created at ${styles.note(`${outputDir}/`)}`)
}

module.exports.menu = `
  ${styles.title('Usage')}

    gitdocs build [options]

  ${styles.title('Options')}

    ${styles.subnote('no options yet')}`
