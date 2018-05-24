const fs = require('fs-extra')
const syspath = require('path')
const { templateForProduction } = require('./template')
const { getContent } = require('./filesystem')

module.exports = async (entrypoints, props) => {
  const _recursive = async ({ items, ...item }) => {
    if (item.outputDir) {
      item.content = await getContent(item.input)
      const template = await templateForProduction(entrypoints, props, item)

      const outputHtml = syspath.join(item.outputDir, 'index.html')
      const outputJson = syspath.join(item.outputDir, 'index.json')

      await fs.outputFile(outputHtml, template)
      await fs.outputJson(outputJson, { content: item.content })
    }

    if (items) {
      await Promise.all(
        items.map(i => _recursive(i))
      )
    }
  }

  return _recursive(props.manifest)
}
