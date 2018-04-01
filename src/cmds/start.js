import chalk from 'chalk'
import { generateRoutes } from '../utils/routes'
import serve from '../config/react/serve'

export default async function(config, args) {
  const routes = await generateRoutes(
    args._[1] || config.get('root'),
    config.get('output'),
  )

  // console.log(JSON.stringify(routes))

  // fs.mkdirSync('./node_modules/gitdocs/dist/sites/react/docs')
  // fs.copySync('./docs', './node_modules/gitdocs/dist/sites/react/docs')
  // process.chdir('./node_modules/gitdocs/dist')
  // globby, chokedir
  serve(args, config.get())
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs start [dir] [options]

  ${chalk.bold.underline('options')}

    ${chalk.italic.dim('no options yet')}
`
