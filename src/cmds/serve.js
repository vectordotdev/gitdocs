import getManifest from '../core/manifest'
import getCompiler from '../core/compiler'
import startServer from '../core/server'
import { styles, log, progress, fullScreen } from '../utils/emit'

export default async function (args, config) {
  fullScreen()
  log('Starting local development server', true)

  const env = 'development'
  const manifest = await getManifest(env, config)
  const bar = progress({ total: 100, clear: true })

  const props = {
    config,
    manifest,
  }

  const compiler = await getCompiler(env, props)
  compiler.onProgress(i => bar.tick(i))

  const server = await startServer(compiler, props)
  log(`We are live at ${styles.url(server.url)}`)
}

export const menu = `
  ${styles.title('Usage')}

    gitdocs serve [options]

  ${styles.title('Options')}

    ${styles.subnote('no options yet')}`
