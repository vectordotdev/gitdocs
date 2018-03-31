import chalk from 'chalk'

export default async function (config, args) {
  console.log('init')
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs init [options]

  ${chalk.bold.underline('options')}

    ${chalk.italic.dim('no options yet')}`
