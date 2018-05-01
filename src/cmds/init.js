import path from 'path'
import fs from 'fs-extra'
import { createConfig } from '../utils/config'
import { styles, log } from '../utils/emit'

const STARTER_DIR = path.resolve(__dirname, '../../starter')

export default async function (args, config) {
  log('Setting up a new GitDocs project', true)

  const dir = args._[1] || config.root
  await createConfig(args.name, dir)

  if (await fs.pathExists(dir)) {
    log(`Using ${styles.note(`${dir}/`)} as your docs folder`)
  } else {
    log(`Creating some documentation at ${styles.note(`${dir}/`)}`)
    await fs.copy(STARTER_DIR, dir)
  }

  log(`Ready to go! Run ${styles.note('gitdocs serve')} to get started`)
}

export const menu = `
  ${styles.title('Usage')}

    gitdocs init [dir] [options]

  ${styles.title('Options')}

    --name, -n ${styles.inactive('..............')} specify a name for your project`
