import chalk from 'chalk'
import fs from 'fs-extra'
import { log } from '../../utils/emit'

export default async function (args, config) {
  const defaultSubCmd = 'help'
  const subCmd = args._[0] === 'help'
    ? args._[1] || defaultSubCmd
    : args._[0] || defaultSubCmd

  try {
    log(require(`../${subCmd}/menu`).default)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      log(require('./menu').default)
    }
  }
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs <command> [options]

    ${chalk.italic.dim('for further info about a command:')}
    gitdocs <command> --help ${chalk.italic.dim('or')} gitdocs help <command>

  ${chalk.bold.underline('commands')}

    init ${chalk.dim('....................')} initialize a new project
    start ${chalk.dim('...................')} runs the development server
    build ${chalk.dim('...................')} creates a static production bundle
    help ${chalk.dim('....................')} show the help menu for a command

  ${chalk.bold.underline('options')}

    --config, -c ${chalk.dim('............')} customize the config file location
    --debug, -d ${chalk.dim('.............')} show full error stacks for a command
    --help, -h ${chalk.dim('..............')} display the usage menu for a command
    --version, -v ${chalk.dim('...........')} show the version number`
