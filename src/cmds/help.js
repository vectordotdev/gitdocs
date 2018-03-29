import chalk from 'chalk'

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs <command> [options]

    ${chalk.italic.dim('for further info about a command:')}
    gitdocs <command> --help ${chalk.italic.dim('or')} gitdocs help <command>

  ${chalk.bold.underline('commands')}

    start ${chalk.dim('................')} runs the development server
    build ${chalk.dim('................')} creates a static production bundle
    help ${chalk.dim('.................')} show the help menu for a command

  ${chalk.bold.underline('options')}

    --help ${chalk.dim('...............')} display the usage menu for a command
    --version ${chalk.dim('............')} show the version number`
