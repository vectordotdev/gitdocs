import chalk from 'chalk'
import getTree from '../core/tree'
import getHydrated from '../core/hydrate'
import getSidebar from '../core/sidebar'
import getWebpack from '../core/webpack'
import { serveBundle } from '../core/bundle'

export default async function (config, args) {
  const name = config.get('name')
  const theme = config.get('theme')
  const inputDir = config.get('root')
  const outputDir = config.get('output')
  const customSidebar = config.get('sidebar')

  const treeRaw = await getTree(inputDir, outputDir)
  const tree = await getHydrated(treeRaw.items)
  const sidebar = customSidebar || await getSidebar(tree)

  const props = {
    name,
    theme,
    sidebar,
    tree,
  }

  const env = 'development'
  const webpackConfig = await getWebpack(env, outputDir, props)
  await serveBundle(webpackConfig, url =>
    console.log(`server running at ${url}`))
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs start [options]

  ${chalk.bold.underline('options')}

    ${chalk.italic.dim('no options yet')}`
