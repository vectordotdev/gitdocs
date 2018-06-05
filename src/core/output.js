const fs = require('fs-extra')
const syspath = require('path')
const { warn } = require('../utils/emit')
const { generateDatabase } = require('./database')
const { templateForProduction } = require('./template')
const { getContent } = require('./filesystem')

module.exports = async (entrypoints, props) => {
  const outputDB = syspath.join(props.config.output, 'db.json')
  const outputSitemap = syspath.join(props.config.output, 'sitemap.xml')
  const outputRobots = syspath.join(props.config.output, 'robots.txt')

  await fs.outputJson(outputDB, await generateDatabase(props.manifest))
  await fs.outputFile(outputSitemap, props.sitemap)

  await fs.pathExists(outputRobots)
    ? warn('You have a custom robots.txt file, so one was not generated for you!')
    : await fs.outputFile(outputRobots, props.robots)

  const _recursive = async ({ items, ...item }) => {
    if (item.outputDir) {
      item.content = await getContent(item.input)
      const template = await templateForProduction(entrypoints, props, item)

      const outputHtml = syspath.join(item.outputDir, 'index.html')
      const outputJson = syspath.join(item.outputDir, 'index.json')

      await fs.outputFile(outputHtml, template)
      await fs.outputJson(outputJson, {
        title: item.title,
        content: item.content,
      })
    }

    if (items) {
      await Promise.all(
        items.map(i => _recursive(i))
      )
    }
  }

  return _recursive(props.manifest)
}
