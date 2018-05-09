const syspath = require('path')
const { Module } = require('module')

function addToNodePath (path) {
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

module.exports = {
  addToNodePath,
}
