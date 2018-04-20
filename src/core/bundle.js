import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import ProgressPlugin from 'webpack/lib/ProgressPlugin'

export async function serveBundle (config, onStart) {
  const serverOpts = {
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    noInfo: true,
  }

  WebpackDevServer.addDevServerEntrypoints(config, serverOpts)

  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, serverOpts)
  const port = 3000

  server.listen(port, 'localhost', () => {
    typeof onStart === 'function' &&
      onStart(`http://localhost:${port}`)
  })
}

export async function buildBundle (config, onProgress) {
  const compiler = webpack(config)

  if (typeof onProgress === 'function') {
    let limit = 0

    new ProgressPlugin((per, msg) => {
      const percentage = Math.floor(per * 100)

      if (percentage > limit) {
        onProgress(percentage - limit)
        limit = percentage
      }
    }).apply(compiler)
  }

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err)
      } else {
        const data = stats.toJson()
        const mainAsset = data.entrypoints.main.assets[0]

        resolve(mainAsset)
      }
    })
  })
}
