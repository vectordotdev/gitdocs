import getManifest from '../core/manifest'
import getCompiler from '../core/compiler'
import outputStatic from '../core/output'
import { styles, log, progress } from '../utils/emit'

export default async function (args, config) {
  log('Creating your documentation', true)

  const env = 'production'
  const manifest = await getManifest(env, config)

  const props = {
    config,
    manifest,
  }

  log('Bundling the Javascript app')

  const bundleBar = progress({ clear: true, total: 100 })
  const compiler = await getCompiler(env, props)
  compiler.onProgress(i => bundleBar.tick(i))

  const stats = await compiler.build()

  log('Rendering and outputting HTML pages')

  const outputBar = progress({
    clear: true,
    total: manifest.files.length,
    append: styles.inactive(':current/:total'),
  })

  const outputDir = await outputStatic(env, stats, props, () => outputBar.tick())

  log(`Site has been created at ${styles.note(`${outputDir}/`)}`)
}

export const menu = `
  ${styles.title('Usage')}

    gitdocs build [options]

  ${styles.title('Options')}

    ${styles.subnote('no options yet')}`
