import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const TEMPLATES_DIR = path.resolve(__dirname, '../../templates')
const NODE_MODULES_DIR = path.resolve(__dirname, '../../node_modules')

export default function (env, config, data = {}) {
  const templateDir = `${TEMPLATES_DIR}/${config.get('template')}`

  return {
    mode: env,
    devtool: 'source-map',
    context: templateDir,
    entry: {
      main: `${templateDir}/entry.js`,
    },
    output: {
      filename: '[hash].js',
      chunkFilename: '[chunkhash].chunk.js',
      path: path.resolve(config.get('output')),
      publicPath: '/',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: '../index.html',
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          NODE_ENV: env,
          INITIAL_PROPS: data,
        }),
      }),
    ],
    resolve: {
      modules: [
        path.resolve(process.cwd()),
        'node_modules',
      ],
      alias: {
        'styled-components': `${NODE_MODULES_DIR}/styled-components`,
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
          test: /\.md$/,
          use: 'raw-loader',
        },
      ],
    },
  }
}
