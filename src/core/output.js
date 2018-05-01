import fs from 'fs-extra'
import renderTemplate from './template'

export default async function (compiler, props, onEachItem) {
  await fs.emptyDir(props.config.output)

  const stats = await compiler.build()
  const bundleFiles = stats.entrypoints.main.assets

  for (const item of props.manifest.files) {
    const rendered = await renderTemplate(item.url, props, bundleFiles)
    await fs.outputFile(item.fileOutput, rendered)

    typeof onEachItem === 'function' &&
      onEachItem(item)
  }

  return props.config.output
}
