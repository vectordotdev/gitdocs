const syspath = require('path')
const webpack = require('webpack')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')
const { babelOptions } = require('../utils/babel')

const THEMES_DIR = syspath.resolve(__dirname, '../../themes')
const NODE_MODS_DIR = syspath.resolve(__dirname, '../../node_modules')

async function getCompiler (env, props) {
  const isDev = env === 'development'

  return webpack({
    mode: env,
    context: syspath.resolve(__dirname, '../../'),
    devtool: isDev
      ? 'cheap-module-eval-source-map'
      : 'cheap-module-source-map',
    entry: {
      main: [
        isDev && 'webpack-hot-middleware/client',
        `${THEMES_DIR}/${props.config.theme}/index.js`,
      ].filter(Boolean),
    },
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[chunkhash].chunk.js',
      path: syspath.resolve(props.config.output),
      publicPath: '/',
    },
    resolve: {
      modules: [
        props.config.temp,
        NODE_MODS_DIR,
        'node_modules',
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: THEMES_DIR,
          exclude: NODE_MODS_DIR,
          use: {
            loader: 'babel-loader',
            options: babelOptions(),
          },
        },
        {
          test: /\.(png)$/,
          use: 'file-loader',
        },
      ],
    },
    plugins: [
      isDev &&
        new webpack.HotModuleReplacementPlugin(),

      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          NODE_ENV: env,
          PROPS: props,
        }),
      }),
    ].filter(Boolean),
  })
}

function getCompilerProgress (compiler, cb) {
  let progressLimit = 0

  new ProgressPlugin((p, msg) => {
    const percentage = Math.floor(p * 100)

    if (percentage > progressLimit) {
      cb(percentage - progressLimit, msg)
      progressLimit = percentage
    }
  }).apply(compiler)
}

function buildBundle (compiler) {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      const info = stats.toJson()

      err || stats.hasErrors()
        ? reject(info.errors.length ? info.errors : err)
        : resolve(info)
    })
  })
}

module.exports = {
  getCompiler,
  getCompilerProgress,
  buildBundle,
}
