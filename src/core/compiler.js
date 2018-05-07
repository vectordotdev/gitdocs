import syspath from 'path'
import fs from 'fs-extra'
import webpack from 'webpack'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

const THEMES_DIR = syspath.resolve(__dirname, '../themes')
const NODE_MODS_DIR = syspath.resolve(__dirname, '../../node_modules')

export default async function (env, props) {
  const isDev = env === 'development'

  // props.config.languages.forEach(lang => {
  //   // languageAliases[`@lang/${lang}$`] = syspath.resolve(
  //   //   NODE_MODS_DIR,
  //   //   `react-syntax-highlighter/languages/hljs/${lang}.js`
  //   // )
  //   // languageAliases[`@lang/${lang}$`] =
  //   //   `react-syntax-highlighter/languages/hljs/${lang}.js`
  // })

  const compiler = webpack({
    mode: env,
    // context: `${THEMES_DIR}/${props.config.theme}`,
    context: syspath.resolve(__dirname, '../../'),
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
          // LANGUAGES: props.config.languages.map(lang =>
          // `react-syntax-highlighter/languages/hljs/${lang}.js`),
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
        const info = stats.toJson()

        err || stats.hasErrors()
          ? reject(info.errors.length ? info.errors : err)
          : resolve(info)
      })
    })
  }

  return compiler
}
