const loadSyntax = require('./syntax')
const staticAssets = require('./static')
const { dirTree } = require('./filesystem')
const { hydrateTree } = require('./hydrate')
const { getRobotsTxt } = require('./robots')
const { getCompiler } = require('./compiler')
const { log } = require('../utils/emit')

module.exports = async (env, localConfig) => {
  // Load only supported syntaxes to reduce bundle size
  await loadSyntax(localConfig)

  // Load static assets like images, scripts, css, etc.
  await staticAssets(localConfig, env === 'development')

  // generate and hydrate the manifest
  const tree = await dirTree(localConfig.root)
  const hydrated = await hydrateTree(tree, localConfig, {
    includeDrafts: env === 'development',
  })

  log('Generated and hydrated manifest')

  // this gets passed to the theme
  const props = {
    config: localConfig,
    manifest: hydrated.manifest,
    sitemap: hydrated.sitemap,
    robots: getRobotsTxt(localConfig),
  }

  // setup webpack compiler so we can build (or watch)
  const compiler = await getCompiler(env, props)

  return {
    props,
    compiler,
  }
}
