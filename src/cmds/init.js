import syspath from 'path'
import fs from 'fs-extra'
import { ask, confirm } from '../utils/readline'
import { createConfig } from '../utils/config'
import { styles, log } from '../utils/emit'

const STARTER_DIR = syspath.resolve(__dirname, '../../starter')

export default async function (args, config) {
  const name = await ask('What is the name of your project?', {
    default: syspath.basename(process.cwd()),
  })

  const existingDocs = args._[1] ||
    await confirm('Do you already have some docs?', { default: 'y' })

  const root = args._[1] || (existingDocs
    ? await ask('Where are your doc files?', { default: config.root })
    : 'docs/')

  const file = await createConfig(name, root)
  log(`Created new config file at ${styles.note(file)}`, true)

  if (await fs.pathExists(root)) {
    log(`Using ${styles.note(root)} as your docs folder`)
  } else {
    log(`Creating some documentation at ${styles.note(root)}`)
    await fs.copy(STARTER_DIR, root)
  }

  log(`Ready to go! Run ${styles.note('gitdocs serve')} to get started`)
}

export const menu = `
  ${styles.title('Usage')}

    gitdocs init [dir] [options]

  ${styles.title('Options')}

    --name, -n ${styles.inactive('..............')} specify a name for your project`
