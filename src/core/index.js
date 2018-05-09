const loadSyntax = require('./syntax')
const getExternals = require('./externals')
const getManifest = require('./manifest')
const staticAssets = require('./static')
const getCompiler = require('./compiler')

module.exports = async (env, config, bar) => {
  await loadSyntax(config)
  await getExternals(config)
  await staticAssets(config, env === 'development')

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
