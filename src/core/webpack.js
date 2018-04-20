import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlWebpackTemplate from 'html-webpack-template'

const THEMES_DIR = path.resolve(__dirname, '../themes')
// const NODE_MODULES_DIR = path.resolve(__dirname, '../../node_modules')

export default function (env, output, props) {
  const isDev = env === 'development'

  return {
    mode: env,
    devtool: isDev
      ? 'cheap-module-eval-source-map'
      : 'cheap-module-source-map',
    context: `${THEMES_DIR}/${props.theme}`,
    entry: {
      main: `${THEMES_DIR}/browser.js`,
    },
    output: {
      filename: '[hash].js',
      chunkFilename: '[chunkhash].chunk.js',
      path: path.resolve(output),
      publicPath: '/',
    },
    resolve: {
      modules: [
        process.cwd(),
        'node_modules',
      ],
      // alias: {
      //   'styled-components': `${NODE_MODULES_DIR}/styled-components`,
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
          test: /\.md$/,
          use: 'raw-loader',
        },
      ],
    },
    plugins: [
      isDev && new webpack.HotModuleReplacementPlugin(),

      isDev && new HtmlWebpackPlugin({
        inject: false,
        template: HtmlWebpackTemplate,
        appMountId: 'gitdocs-app',
        title: props.name,
      }),

      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          NODE_ENV: env,
          PROPS: props,
        }),
      }),
    ].filter(Boolean),
  }
}
