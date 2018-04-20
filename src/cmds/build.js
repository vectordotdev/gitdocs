import fs from 'fs-extra'
import chalk from 'chalk'
import getTree from '../core/tree'
import getHydrated from '../core/hydrate'
import getSidebar from '../core/sidebar'
import getWebpack from '../core/webpack'
import { buildBundle } from '../core/bundle'
import render from '../core/render'
import { log, progress } from '../utils/emit'

export default async function (config, args) {
  const name = config.get('name')
  const theme = config.get('theme')
  const inputDir = config.get('root')
  const outputDir = config.get('output')
  const customSidebar = config.get('sidebar')

  const treeRaw = await getTree(inputDir, outputDir)
  const numberOfOperations =
    (treeRaw.count * 2) + // processes each route twice--hydrate and render
    100 // for percentage of webpack bundle

  const bar = progress(numberOfOperations)

  const tree = await getHydrated(treeRaw.items, () => bar.tick())
  const sidebar = customSidebar || await getSidebar(tree)

  const props = {
    name,
    theme,
    sidebar,
    tree,
  }

  await fs.emptyDir(outputDir)

  const env = 'production'
  const webpackConfig = await getWebpack(env, outputDir, props)
  const bundleFile = await buildBundle(webpackConfig, i => bar.tick(i))

  await render(tree, bundleFile, props, () => bar.tick())
  log('all done :)')
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs build [options]

  ${chalk.bold.underline('options')}

    ${chalk.italic.dim('no options yet')}`
