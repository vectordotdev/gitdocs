import chalk from 'chalk'
import templates from '../bundler/templates'

export default async function (config, args) {
  await templates(
    config.get('root'),
    config.get('output')
  )
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs build [options]

  ${chalk.bold.underline('options')}

    ${chalk.italic.dim('no options yet')}`
