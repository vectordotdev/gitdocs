import chalk from 'chalk'

export default async function (config, args) {
  // args.output
  console.log('build')
}

export const menu = `
  ${chalk.bold.underline('usage')}

    gitdocs build [options]

  ${chalk.bold.underline('options')}

    --output, -o ${chalk.dim('..............')} compile files into this directory`
