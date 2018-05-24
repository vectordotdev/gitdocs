function babelOptions (forServer) {
  return {
    babelrc: false,
    presets: [
      require.resolve('babel-preset-env'),
      require.resolve('babel-preset-react'),
    ],
    plugins: [
      require.resolve('babel-plugin-transform-runtime'),
      require.resolve('babel-plugin-transform-object-rest-spread'),
      require.resolve('babel-plugin-transform-class-properties'),
    ].filter(Boolean),
  }
}

function babelRequire (path) {
  const opts = babelOptions(true)
  opts.ignore = false

  require('babel-register')(opts)
  return require(path)
}

module.exports = babelRequire
module.exports.babelOptions = babelOptions
