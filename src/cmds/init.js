import chalk from 'chalk'
import path from 'path'
import fs from 'fs-extra'
import { createConfig } from '../utils/config'
import { log } from '../utils/emit'

const STARTER_DIR = path.resolve(__dirname, '../../starter')

export default async function (args, config) {
  log('creating a gitdocs project', true)

  const dir = args._[1] || config.root
  await createConfig(args.name, dir)

  if (await fs.pathExists(dir)) {
    log('found a docs folder! using it')
  } else {
    log('generating example files')
    await fs.copy(STARTER_DIR, dir)
  }

  log('ready to go! run `gitdocs start`')
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs init [dir] [options]

  ${chalk.bold.underline('options')}

    --name, -n ${chalk.dim('..............')} specify a name for your project`
