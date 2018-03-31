import path from 'path'
import fs from 'fs-extra'

export async function generateRoutes (baseDir, outputDir) {
  if (!await fs.pathExists(baseDir)) {
    throw new Error('Could not find any documentation')
  }

  const walk = async filename => {
    const stats = await fs.stat(filename)
    const extension = path.extname(filename)
    const basename = path.basename(filename, extension)

    const info = {
      path: `/${basename === 'index' ? '' : basename}`
    }

    // don't include any files/folders that start with underscore
    if (/^_/.test(basename)) {
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
      if (extension !== '.md') {
        return
      }

      info.inputFile = filename
      info.outputFile = filename
        .replace(baseDir, outputDir)
        .replace(extension, '.html')
    }

    return info
  }

  return (await walk(baseDir)).children
}
