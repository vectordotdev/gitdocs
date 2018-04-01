import webpack from 'webpack'
import merge from 'webpack-merge'
import WebpackDevServer from 'webpack-dev-server'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import path from 'path'

const defaults = {
  context: path.resolve(__dirname, '../sites/react'),
  entry: ['./src/index.js'],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
    ],
  },
  output: {
    path: path.join(process.cwd(), './.gitdocs-build/'),
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[chunkhash].js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(process.cwd(), './.gitdocs-build'),
    hot: true,
    historyApiFallback: true,
  },
  mode: 'development',
}

const port = 8080

const options = {
  stats: { colors: true },
}

export default (args, config) => {
  const compiler = webpack(merge(config, defaults))
  const server = new WebpackDevServer(compiler, options)

  server.listen(port, 'localhost', err => {
    if (err) {
      console.log(err)
    }
    console.log('WebpackDevServer listening at localhost:', port)
  })
}
