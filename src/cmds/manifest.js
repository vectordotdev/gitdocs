const { dirTree } = require('../core/filesystem')
const { hydrateTree } = require('../core/hydrate')

module.exports = async (args, config) => {
  const tree = await dirTree(config.root)
  const { manifest } = await hydrateTree(tree, config)

  const manifestStr = JSON.stringify(manifest, null, 2)

  console.log(manifestStr)
}
