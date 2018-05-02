import fs from 'fs-extra'
import renderTemplate from './template'
import { concurrentChunks } from '../utils/promise'

export default async function (env, stats, props, onEachItem) {
  const { files } = props.manifest
  const bundleFile = stats.entrypoints.main.assets[0]

  await concurrentChunks(2, files.map(item => async () => {
    const rendered = await renderTemplate(env, item, props, bundleFile)
    await fs.outputFile(item.fileOutput, rendered)

    typeof onEachItem === 'function' &&
      onEachItem(item)
  }))

  return props.config.output
}
