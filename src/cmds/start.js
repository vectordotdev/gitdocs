import chalk from 'chalk'
import fs from 'fs-extra'
import { generateRoutes } from '../utils/routes'
import startDevServer from '../react/start'

export default async function (config, args) {
  const routes = await generateRoutes(
    args._[1] || config.get('root'),
    config.get('output')
  )

  console.log(JSON.stringify(routes))

  fs.mkdirSync('./node_modules/gitdocs/dist/sites/react/docs')
  fs.copySync('./docs', './node_modules/gitdocs/dist/sites/react/docs')
  process.chdir('./node_modules/gitdocs/dist')
  startDevServer()
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs start [dir] [options]

  ${chalk.bold.underline('options')}

    ${chalk.italic.dim('no options yet')}`
