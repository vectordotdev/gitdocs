import chalk from 'chalk'
import boilerplate from '../bundler/boilerplate'

export default async function (config, args) {
  const dir = args._[1] || config.get('root')

  await config.create(args.name, dir)
  await boilerplate(dir)
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs init [dir] [options]

  ${chalk.bold.underline('options')}

    --name, -n ${chalk.dim('..............')} specify a name for your project`
