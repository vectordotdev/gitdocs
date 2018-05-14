const loadSyntax = require('./syntax')
const getExternals = require('./externals')
const getManifest = require('./manifest')
const staticAssets = require('./static')
const getCompiler = require('./compiler')
const mergeConfig = require('./merge')

module.exports = async (env, localConfig, bar) => {
  // Load only supported syntaxes to reduce bundle size
  await loadSyntax(localConfig)

  // Fetch any external docs sources
  const externals = await getExternals(localConfig)

  // Merge current and extenal configs
  const config = mergeConfig(localConfig, externals)

  // Load static assets like images, scripts, css, etc.
  await staticAssets(localConfig, env === 'development')

  // Build the documentation manifest
  const manifest = await getManifest(env, config)

  // this gets passed to the theme app
  const props = {
    config,
    manifest,
  }

  const compiler = await getCompiler(env, props)
  bar && compiler.onProgress(i => bar.tick(i))

  return { props, compiler }
}
