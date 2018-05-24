const fs = require('fs-extra')
const core = require('../core')
const output = require('../core/output')
const { buildBundle } = require('../core/compiler')
const { styles, log } = require('../utils/emit')

module.exports = async (args, config) => {
  log('Creating your documentation site', true)

  log('Bundling the Javascript app')
  await fs.emptyDir(config.output)

  const {
    props,
    compiler,
  } = await core('production', config)

  const {
    entrypoints,
  } = await buildBundle(compiler)

  log('Rendering and outputting HTML pages')

  await output(entrypoints, props)
  log(`Site has been saved to ${styles.note(`${config.output}/`)}`)
}

module.exports.menu = `
  ${styles.title('Usage')}

    gitdocs build [options]

  ${styles.title('Options')}

    ${styles.subnote('no options yet')}`
