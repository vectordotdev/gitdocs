import path from 'path'
import webpack from 'webpack'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

const THEMES_DIR = path.resolve(__dirname, '../themes')

export default async function (env, props) {
  const isDev = env === 'development'

  const compiler = webpack({
    mode: env,
    devtool: isDev
      ? 'cheap-module-eval-source-map'
      : 'cheap-module-source-map',
    context: `${THEMES_DIR}/${props.config.theme}`,
    entry: {
      main: `${THEMES_DIR}/browser.js`,
    },
    output: {
      filename: '[hash].js',
      chunkFilename: '[chunkhash].chunk.js',
      path: path.resolve(props.config.output),
      publicPath: '/',
    },
    resolve: {
      modules: [process.cwd(), 'node_modules'],
      alias: {
        // temporary hack to get around duplicate sc issue
        'styled-components': path.resolve(
          __dirname,
          '../../node_modules/styled-components'
        ),
      },
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
      isDev && new webpack.HotModuleReplacementPlugin(),

      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
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

  compiler.build = () => {
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
