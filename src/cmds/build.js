import fs from 'fs-extra'
import chalk from 'chalk'
import getTree from '../core/tree'
import getHydrated from '../core/hydrate'
import getSidebar from '../core/sidebar'
import render from '../core/render'
import { log, progress } from '../utils/emit'

export default async function (config, args) {
  const name = config.get('name')
  const inputDir = config.get('root')
  const outputDir = config.get('output')
  const customSidebar = config.get('sidebar')
  const template = config.get('template')

  await fs.emptyDir(outputDir)

  const tree = await getTree(inputDir, outputDir)
  const bar = progress(tree.count * 2)

  const treeHydrated = await getHydrated(tree.items, () => bar.tick())
  const sidebar = customSidebar || await getSidebar(treeHydrated)

  const props = { name, template, sidebar }
  await render(treeHydrated, props, () => bar.tick())

  log('all done :)')
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs build [options]

  ${chalk.bold.underline('options')}

    ${chalk.italic.dim('no options yet')}`
