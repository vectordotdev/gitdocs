import chalk from 'chalk'

export default async function (config, args) {
  console.log('start')
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs start [dir] [options]

  ${chalk.bold.underline('options')}

    ${chalk.italic.dim('no options yet')}`
