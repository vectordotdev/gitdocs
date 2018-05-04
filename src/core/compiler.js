import syspath from 'path'
import fs from 'fs-extra'
import webpack from 'webpack'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

const THEMES_DIR = syspath.resolve(__dirname, '../themes')
const NODE_MODS_DIR = syspath.resolve(__dirname, '../../node_modules')

export default async function (env, props) {
  const isDev = env === 'development'

  const compiler = webpack({
    mode: env,
    context: `${THEMES_DIR}/${props.config.theme}`,
    devtool: isDev
      ? 'cheap-module-eval-source-map'
      : 'cheap-module-source-map',
    entry: {
      main: [
        isDev && 'webpack-hot-middleware/client',
        `${THEMES_DIR}/browser.js`,
      ].filter(Boolean),
    },
    output: {
      filename: '[hash].js',
      chunkFilename: '[chunkhash].chunk.js',
      path: syspath.resolve(props.config.output),
      publicPath: '/',
    },
    resolve: {
      modules: [NODE_MODS_DIR, 'node_modules'],
      // alias: {
      // temporary hack to get around duplicate sc issue
      // 'styled-components': syspath.resolve(
      //   __dirname,
      //   '../../node_modules/styled-components'
      // ),
      // },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
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

  compiler.onProgress = (func) => {
    let progressLimit = 0

    new ProgressPlugin((p, msg) => {
      const percentage = Math.floor(p * 100)

      if (percentage > progressLimit) {
        func(percentage - progressLimit, msg)
        progressLimit = percentage
      }
    }).apply(compiler)
  }

  compiler.build = async () => {
    await fs.emptyDir(props.config.output)

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        err || stats.hasErrors()
          ? reject(err)
          : resolve(stats.toJson())
      })
    })
  }

  return compiler
}
