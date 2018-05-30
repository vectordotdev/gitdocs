const http = require('http')
const connect = require('connect')
const serveStatic = require('serve-static')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { namespaces } = require('../utils/temp')
const { generateDatabase } = require('./database')
const { templateForDevelopment } = require('./template')
const attachSocket = require('./socket')

module.exports = (props, compiler) => {
  const {
    host,
    port,
    temp,
  } = props.config

  const app = connect()
  const url = `http://${host}:${port}`
  const staticDir = `${temp}/${namespaces.static}`

  const compilerInstance = webpackDevMiddleware(compiler, {
    logLevel: 'warn',
    serverSideRender: true,
  })

  const compilerHotInstance = webpackHotMiddleware(compiler, {
    log: false,
  })

  app.use(compilerInstance)
  app.use(compilerHotInstance)

  app.use(serveStatic(staticDir, {
    index: false,
  }))

  app.use('/robots.txt', (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end(props.robots)
  })

  app.use('/sitemap.xml', (req, res, next) => {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.end(props.sitemap)
  })

  app.use('/db.json', async (req, res, next) => {
    try {
      const db = await generateDatabase(props.manifest)

      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(db))
    } catch (err) {
      next(err)
    }
  })

  app.use(async (req, res, next) => {
    try {
      const { entrypoints } = res.locals.webpackStats.toJson()
      const rendered = await templateForDevelopment(entrypoints)

      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(rendered)
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
  attachSocket(server)

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
