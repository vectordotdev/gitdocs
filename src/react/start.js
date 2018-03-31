const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./config.js')

const port = 8080

const options = {
  stats: { colors: true },
}

export default paths => {
  const server = new WebpackDevServer(webpack(config), options)

  server.listen(port, 'localhost', err => {
    if (err) {
      console.log(err)
    }
    console.log('WebpackDevServer listening at localhost:', port)
  })
}
