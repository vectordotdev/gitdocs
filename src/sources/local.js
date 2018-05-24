const fs = require('fs-extra')
const syspath = require('path')

module.exports = async (source, path) => {
  const currentDir = syspath.dirname(path)
  const localPath = syspath.resolve(currentDir, source)

  if (!await fs.pathExists(localPath)) {
    throw new Error(`Could not find local source: ${localPath}`)
  }

  return localPath
}
