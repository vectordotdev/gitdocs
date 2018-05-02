import WebSocket from 'ws'
import chokidar from 'chokidar'
import source from '../utils/source'
import { styles, log, error } from '../utils/emit'

export default function (server, manifest) {
  const socket = new WebSocket.Server({
    server
  })

  socket.on('connection', client => {
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

    const watcher = chokidar.watch()
      .on('change', file => {
        const fileIdx = manifest.filemap[file]
        const item = manifest.files[fileIdx]

        client.sendContent(item)
      })

    client.on('message', evt => {
      const item = JSON.parse(evt)

      client.sendContent(item, true)
      watcher.add(item.file)
    })

    client.on('close', () => {
      watcher.close()
    })
  })

  return socket
}

// socket.broadcast = data =>
//   socket.clients.forEach(client =>
//     client.readyState === WebSocket.OPEN &&
//       client.send(JSON.stringify(data)))
