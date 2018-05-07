import http from 'http'
import connect from 'connect'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import renderTemplate from './template'
import attachSocket from './socket'

export default function (env, compiler, props) {
  const {
    host,
    port,
  } = props.config

  const app = connect()
  const url = `http://${host}:${port}`

  const compilerInstance = webpackDevMiddleware(compiler, {
    logLevel: 'warn',
    serverSideRender: true,
  })

  const compilerHotInstance = webpackHotMiddleware(compiler, {
    log: false,
  })

  app.use(compilerInstance)
  app.use(compilerHotInstance)

  app.use(async (req, res, next) => {
    try {
      const stats = res.locals.webpackStats.toJson()
      const bundleFiles = stats.entrypoints.main.assets
      const routeIdx = props.manifest.urlmap[req.url]
      const route = props.manifest.files[routeIdx]

      const rendered = await renderTemplate(env, route, props, bundleFiles)

      if (!route) {
        res.statusCode = 404
      }

      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(rendered)

      next()
    } catch (err) {
      next(err)
    }
  })

  app.use((err, req, res, next) => {
    console.error(err)
    res.end('an error occurred!')

    next()
  })

  const server = http.createServer(app)
  attachSocket(server, props.manifest)

  return new Promise((resolve, reject) => {
    server.listen(port, host, err => {
      if (err) {
        return reject(err)
      }

      compilerInstance.waitUntilValid(() => {
        resolve({ url })
      })
    })
  })
}
