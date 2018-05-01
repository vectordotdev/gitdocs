import getManifest from '../core/manifest'
import getCompiler from '../core/compiler'
import outputStatic from '../core/output'
import { styles, log, progress } from '../utils/emit'

export default async function (args, config) {
  log('Building your documentation', true)

  const env = 'production'
  const manifest = await getManifest(env, config)

  const props = {
    config,
    manifest,
  }

  const bundleBar = progress({ total: 100, clear: true })
  const compiler = await getCompiler(env, props)
  compiler.onProgress(i => bundleBar.tick(i))

  log('Saving site files to output directory')

  const outputBar = progress({ total: manifest.files.length, clear: true })
  const outputDir = await outputStatic(compiler, props, () => outputBar.tick())

  log(`Site has been created at ${styles.note(`${outputDir}/`)}`)
}

export const menu = `
  ${styles.title('Usage')}

    gitdocs build [options]

  ${styles.title('Options')}

    ${styles.subnote('no options yet')}`
