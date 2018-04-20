// import webpack from 'webpack'
// import WebpackDevServer from 'webpack-dev-server'
// import serverEntry from '../templates/server'

// export async function serve (config) {
//   const serverOpts = {
//     historyApiFallback: true,
//     host: 'localhost',
//     hot: true,
//     noInfo: true,
//   }

//   WebpackDevServer.addDevServerEntrypoints(config, serverOpts)

//   const compiler = webpack(config)
//   const server = new WebpackDevServer(compiler, serverOpts)

//   server.listen(3000, 'localhost', () => {
//     console.log('server running at http://localhost:3000')
//   })
// }

// export async function build (config) {
//   const bundleConfig = _webpackConfig('production', config, {

//   })

//   console.log(bundleConfig)
//   const compiler = webpack(config)

//   compiler.run(() => {
//     console.log('built!')
//   })
// }
