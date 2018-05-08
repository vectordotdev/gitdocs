const net = require('net')

module.exports = () => {
  const server = net.createServer()

  return new Promise((resolve, reject) => {
    server.on('error', reject)

    server.unref()
    server.listen(0, () => {
      const port = server.address().port
      server.close(() => resolve(port))
    })
  })
}
