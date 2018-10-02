function babelOptions (forServer) {
  return {
    babelrc: false,
    presets: [
      require.resolve('@babel/preset-env'),
      require.resolve('@babel/preset-react'),
    ],
    plugins: [
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-transform-runtime'),
    ].filter(Boolean),
  }
}

function babelRequire (path) {
  const opts = babelOptions(true)
  opts.ignore = false

  require('@babel/register')(opts)
  return require(path)
}

module.exports = babelRequire
module.exports.babelOptions = babelOptions
