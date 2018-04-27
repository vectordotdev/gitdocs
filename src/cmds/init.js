import chalk from 'chalk'
import path from 'path'
import fs from 'fs-extra'
import { createConfig } from '../../utils/config'
import { log } from '../../utils/emit'

const STARTER_DIR = path.resolve(__dirname, '../../../starter')

export default async function (args, config) {
  const dir = args._[1] || config.root
  await createConfig(args.name, dir)

  if (await fs.pathExists(dir)) {
    log('using existing docs folder...')
  } else {
    log('creating docs folder...')
    await fs.copy(STARTER_DIR, dir)
  }
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs init [dir] [options]

  ${chalk.bold.underline('options')}

    --name, -n ${chalk.dim('..............')} specify a name for your project`
