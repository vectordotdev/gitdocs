const tmp = require('tmp')
const syspath = require('path')
const { Module } = require('module')

function _addToNodePath (path) {
  const currentPath = process.env.NODE_PATH || ''

  process.env.NODE_PATH = currentPath
    .split(syspath.delimiter)
    .filter(Boolean)
    .concat(path)
    .join(syspath.delimiter)

  if (typeof Module._initPaths !== 'function') {
    throw new Error('Module._initPaths is not available in this version of Node!')
  }

  Module._initPaths()
}

function tempDir () {
  tmp.setGracefulCleanup()

  const dir = tmp.dirSync({
    prefix: 'gitdocs-',
  })

  _addToNodePath(dir.name)
  return dir.name
}

module.exports = {
  tempDir,
}
