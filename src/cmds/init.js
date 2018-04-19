import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'

const BOILERPLATE_DIR = path.resolve(__dirname, '../../boilerplate')

export default async function (config, args) {
  const dir = args._[1] || config.get('root')
  await config.create(args.name, dir)

  if (await fs.pathExists(dir)) {
    return
  }

  await fs.copy(BOILERPLATE_DIR, dir)
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs init [dir] [options]

  ${chalk.bold.underline('options')}

    --name, -n ${chalk.dim('..............')} specify a name for your project`
