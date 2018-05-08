"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaults = {
  context: _path.default.resolve(__dirname, '../sites/react'),
  entry: ['./src/index.js'],
  module: {
    rules: [{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }, {
      test: /\.md$/,
      use: 'raw-loader'
    }]
  },
  output: {
    path: _path.default.join(process.cwd(), './.gitdocs-build/'),
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[chunkhash].js'
  },
  plugins: [new _htmlWebpackPlugin.default({
    template: './src/index.html',
    filename: './index.html'
  }), new _webpack.default.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: _path.default.join(process.cwd(), './.gitdocs-build'),
    hot: true,
    historyApiFallback: true
  },
  mode: 'development'
};
const port = 8080;
const options = {
  stats: {
    colors: true
  }
};

var _default = (args, config) => {
  const compiler = (0, _webpack.default)((0, _webpackMerge.default)(config, defaults));
  const server = new _webpackDevServer.default(compiler, options);
  server.listen(port, 'localhost', err => {
    if (err) {
      console.log(err);
    }

    console.log('WebpackDevServer listening at localhost:', port);
  });
};

exports.default = _default;