import chalk from 'chalk'

export default async function () {
  console.log('build')
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs build [options]

  ${chalk.bold.underline('options')}

    ${chalk.italic.dim('no options yet')}
`
