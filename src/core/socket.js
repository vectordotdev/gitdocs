import fs from 'fs'
import WebSocket from 'ws'
import source from '../utils/source'
import { styles, log, error } from '../utils/emit'

export default function (server, manifest) {
  const socket = new WebSocket.Server({
    server
  })

  socket.on('connection', client => {
    let watcher

    client.sendContent = async (item, initial) => {
      try {
        const action = initial ? 'Loading' : 'Reloading'
        log(`${action} ${styles.note(item.url)}`)

        Object.assign(item, await source(item.file))
        client.send(JSON.stringify(item))
      } catch (err) {
        error(err)
      }
    }

    client.on('message', evt => {
      // console.log(evt)
      const item = JSON.parse(evt)
      client.sendContent(item, true)

      if (!watcher) {
        watcher = fs.watch(item.file, fileEvt => {
          if (fileEvt === 'change') {
            client.sendContent(item)
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
