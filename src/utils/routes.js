import path from 'path'
import fs from 'fs-extra'
import objectPath from 'object-path'

export async function generateRoutes (baseDir, outputDir) {
  const excludePattern = /^_/

  const walk = async filename => {
    const stats = await fs.stat(filename)
    const extension = path.extname(filename)
    const basename = path.basename(filename, extension)
    const info = { path: `/${basename === 'index' ? '' : basename}` }

    if (excludePattern.test(basename)) {
      return
    }

    if (stats.isDirectory()) {
      const files = await fs.readdir(filename)
      const children = await Promise.all(
        files.map(child => walk(`${filename}/${child}`))
      )

      info.children = children.filter(Boolean)
    }

    if (stats.isFile()) {
      info.markdownFile = filename
      info.outputFile = filename
        .replace(baseDir, path.resolve(outputDir))
        .replace(extension, '.html')
    }

    return info
  }

  const tree = await walk(baseDir)
  return tree.children
}
