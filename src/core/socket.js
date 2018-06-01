const fs = require('fs')
const WebSocket = require('ws')
const { getContent } = require('./filesystem')

module.exports = (server) => {
  const socket = new WebSocket.Server({
    server
  })

  socket.on('connection', client => {
    let watcher

    client.on('message', file => {
      const send = async () => {
        const content = await getContent(file)
        client.send(JSON.stringify({
          content,
        }))
      }

      send()

      if (!watcher) {
        watcher = fs.watch(file, fileEvt => {
          if (fileEvt === 'change') {
            send()
          }
        })
      }
    })

    client.on('close', () => {
      if (watcher) {
        watcher.close()
      }
    })
  })

  return socket
}

// socket.broadcast = data =>
//   socket.clients.forEach(client =>
//     client.readyState === WebSocket.OPEN &&
//       client.send(JSON.stringify(data)))
