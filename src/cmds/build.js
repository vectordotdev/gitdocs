import chalk from 'chalk'
import { generateRouteTree } from '../bundler/routing'
import { findComponents } from '../bundler/components'
import { staticOutput } from '../bundler/static'

export default async function (config, args) {
  const base = config.get('root')
  const output = config.get('output')

  const tree = await generateRouteTree(base, output)
  const components = await findComponents(base)

  await staticOutput(tree, components, output)
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs build [options]

  ${chalk.bold.underline('options')}

    ${chalk.italic.dim('no options yet')}`
