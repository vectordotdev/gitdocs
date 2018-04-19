import fs from 'fs-extra'
import chalk from 'chalk'
import getRoutes from '../core/routes'
import getNavigation from '../core/navigation'
import getHydrated from '../core/hydrate'
import getRendered from '../core/render'
import { log, progress } from '../utils/emit'

export default async function (config, args) {
  const inputDir = config.get('root')
  const outputDir = config.get('output')
  const customNav = config.get('navigation')
  const template = config.get('template')

  await fs.emptyDir(outputDir)

  const routeTree = await getRoutes(inputDir, outputDir)
  const navigation = customNav || await getNavigation(routeTree.items)

  const progressBar = progress(routeTree.count, ':bar  :current/:total pages')

  await routeTree.forEachItem(async route => {
    const hydrated = await getHydrated(route)
    const rendered = await getRendered(template, hydrated, {
      routeTree,
      navigation,
    })

    await fs.outputFile(route.output, rendered)

    progressBar.tick()
  })

  log('all done :)')
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs build [options]

  ${chalk.bold.underline('options')}

    ${chalk.italic.dim('no options yet')}`
