import serve from '../../bundler/serve'
import reactConfig from '../react'

export default function serveReact(args, config) {
  serve(args, reactConfig(config))
}
