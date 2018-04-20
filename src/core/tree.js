import path from 'path'
import fs from 'fs-extra'
import { routify, outputify } from '../utils/path'

// exclude underscored and dotfiles
const IGNORE_PATTERN = /(?:^|\/)(?:\.|_)/

async function checkForIndexConflict (file) {
  const dir = path.dirname(file)
  const ext = path.extname(file)
  const base = path.basename(file, ext)
  const indexFile = `${dir}/${base}/index${ext}`

  if (indexFile !== file && await fs.pathExists(indexFile)) {
    throw new Error(`Conflicting files were found! Please use one or the other.\n\t- ${file}\n\t- ${indexFile}`)
  }
}

export default async function (inputDir, outputDir) {
  let count = 0

  const _walk = async filepath => {
    if (IGNORE_PATTERN.test(filepath)) {
      return null
    }

    const stats = await fs.stat(filepath)
    const item = { path: routify(filepath, inputDir) }

    if (stats.isFile()) {
      // cannot have both something/index.md and something.md,
      // since we add trailing slashes to everything for the static routing
      await checkForIndexConflict(filepath)

      item.file = filepath
      item.isIndex = /\/index\.[\w]+$/.test(filepath)
      item.output = outputify(filepath, {
        replace: [inputDir, outputDir],
      })

      count += 1
    }

    if (stats.isDirectory()) {
      const files = await fs.readdir(filepath)
      const children = await Promise.all(
        files.map(f => _walk(path.join(filepath, f)))
      )

      item.children = children.filter(Boolean)
    }

    return item
  }

  const {
    // move up a layer since we dont want base directory
    children: items,
  } = await _walk(inputDir)

  return {
    count,
    items,
  }
}
