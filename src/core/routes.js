import path from 'path'
import fs from 'fs-extra'
import matter from 'gray-matter'
import { routify, outputify } from '../utils/path'

export default async function (inputDir, outputDir) {
  if (!await fs.pathExists(inputDir)) {
    throw new Error(`"${inputDir}" does not exist!`)
  }

  let count = 0
  const _walk = async (filePath, basePath = '') => {
    // exclude underscored and dotfiles
    if (/(?:^|\/)(?:\.|_)/.test(filePath)) {
      return null
    }

    const stats = await fs.stat(filePath)
    const item = {
      id: `${stats.dev}${stats.ino}`,
      path: routify(filePath, inputDir),
    }

    if (stats.isFile()) {
      count += 1

      const ext = path.extname(filePath).substring(1)
      const isIndex = /\/index\.[\w]+$/.test(filePath)
      const frontMatter = matter(await fs.readFile(filePath))

      // cannot have both category/index.md and category.md,
      // since we add trailing slashes to everything for the static routing
      const indexPath = outputify(filePath, { ext })
      if (indexPath !== filePath && await fs.pathExists(indexPath)) {
        throw new Error(`Conflicting files were found! Please use one or the other.\n\t- ${filePath}\n\t- ${indexPath}`)
      }

      Object.assign(item, {
        type: ext,
        index: isIndex,
        output: outputify(filePath, {
          ext: 'html',
          replace: [inputDir, outputDir]
        }),
        data: frontMatter.data,
        content: frontMatter.content,
      })
    }

    if (stats.isDirectory()) {
      const files = await fs.readdir(filePath)
      const children = await Promise.all(
        files.map(f => _walk(path.join(filePath, f)))
      )

      item.children = children
        .filter(Boolean) // filter out excluded files that resulted in null
        .sort((a, b) => a.path > b.path)
    }

    return item
  }

  const {
    children: items = [],
  } = await _walk(inputDir)

  return {
    count,
    items,

    // easy way to run async functions in parallel for each route
    forEachItem: func => {
      const _recursive = i => Promise.all(
        i.map(async j => {
          if (j.children) {
            j.children = await _recursive(j.children)
          } else {
            await func(j)
          }
        })
      )

      return _recursive(items)
    },
  }
}
