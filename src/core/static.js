const fs = require('fs-extra')
const syspath = require('path')
const chokidar = require('chokidar')

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

module.exports = async (config, shouldWatch) => {
  const dir = syspath.join(config.temp, '@static')

  await fs.copy(config.static, dir)
  shouldWatch && _watch(config.static, dir)

  return dir
}
