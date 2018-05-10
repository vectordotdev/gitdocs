const fs = require('fs-extra')
const renderTemplate = require('./template')
const { concurrentChunks } = require('../utils/promise')

module.exports = async (env, stats, props, bar) => {
  const {
    manifest,
    config,
  } = props

  const bundleFiles = stats.entrypoints.main.assets

  await concurrentChunks(2, manifest.files.map(item => async () => {
    const rendered = await renderTemplate(env, item, props, bundleFiles)
    await fs.outputFile(item.fileOutput, rendered)

    bar && bar.tick()
  }))

  return config.output
}
