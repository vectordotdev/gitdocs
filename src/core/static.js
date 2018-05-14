const fs = require('fs-extra')
const syspath = require('path')
const chokidar = require('chokidar')
const { namespaces } = require('../utils/temp')
const { log } = require('../utils/emit')

function _watch (cwd, tempDir) {
  const watcher = chokidar.watch('**/*', {
    cwd,
    ignoreInitial: true,
  })

  watcher.on('all', (evt, path) => {
    const inputPath = `${cwd}/${path}`
    const outputPath = `${tempDir}/${path}`

    switch (evt) {
      case 'add':
      case 'change':
        fs.copySync(inputPath, outputPath)
        break

      case 'unlink':
      default:
        fs.removeSync(outputPath)
        break
    }
  })
}

module.exports = async (config, useTempDir) => {
  if (!await fs.pathExists(config.static)) {
    return
  }

  const dir = syspath.join(config.temp, namespaces.static)

  if (useTempDir) {
    await fs.copy(config.static, dir)
    _watch(config.static, dir)
  } else {
    await fs.copy(config.static, config.output)
  }

  log('[\u2713] Static assets loaded')

  return dir
}
