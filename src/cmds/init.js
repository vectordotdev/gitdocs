const syspath = require('path')
const fs = require('fs-extra')
const { copyDir } = require('../core/filesystem')
const { ask, confirm } = require('../utils/readline')
const { createConfig } = require('../utils/config')
const { styles, log } = require('../utils/emit')

const STARTER_DIR = syspath.resolve(__dirname, '../../starter')

module.exports = async (args, config) => {
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
    await copyDir(STARTER_DIR, root)
  }

  log(`Ready to go! Run ${styles.note('gitdocs serve')} to get started`)
}

module.exports.menu = `
  ${styles.title('Usage')}

    gitdocs init [dir] [options]

  ${styles.title('Options')}

    --name, -n ${styles.inactive('..............')} specify a name for your project`
