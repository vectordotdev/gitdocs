const syspath = require('path')

function getMod (path, namespaced = true) {
  const baseDir = syspath.resolve(__dirname, '../../node_modules')
  const module = require(`${baseDir}/babel-${path}`)

  return module.default || module
}

function babelOptions (forServer) {
  return {
    babelrc: false,
    presets: [
      getMod('preset-env'),
      getMod('preset-react'),
    ],
    plugins: [
      getMod('plugin-transform-runtime'),
      getMod('plugin-transform-object-rest-spread'),
      getMod('plugin-transform-class-properties'),
      getMod('plugin-syntax-dynamic-import'),
      forServer ? getMod('plugin-dynamic-import-node') : null,
    ].filter(Boolean),
  }
}

function babelRequire (path) {
  const opts = babelOptions(true)

  require('babel-register')(opts)
  return require(path)
}

module.exports = babelRequire
module.exports.babelOptions = babelOptions
