const chalk = require('chalk')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const merge = require('lodash.merge')
const path = require('path')

const defaults = require('../../default.json')

const handler = async (argv, cwd) => {
  console.log(chalk.green('Initializing GitDocs project'))

  const docs = path.join(cwd, 'docs')
  const publicDir = path.join(docs, 'public')

  try {
    console.log(`Creating doc directory: ${docs}`)
    fs.mkdirSync(docs)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(chalk.red('Could not create doc directory'))
      throw err
    } else {
      console.warn(chalk.yellow('Docs directory already exists.'))
    }
  }

  try {
    console.log(`Creating public directory: ${publicDir}`)
    await fs.mkdir(publicDir)
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(chalk.red('Could not create public directory'))
      throw err
    } else {
      console.warn(chalk.yellow('Public directory already exists.'))
    }
  }

  // Create default config & welcome file
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What should we name this project?',
      default: 'my-documentation',
    },
    {
      type: 'input',
      name: 'repository',
      message: 'URL of the repository where this documentation is stored.',
    },
  ])

  const configFile = path.join(docs, 'docs.json')
  const config = merge(defaults, {
    name: answers.name,
    repository: answers.repository,
    title: answers.name,
    version: '0.0.1',
  })

  try {
    console.log(`Writing default config file as ${configFile}`)
    const fp = await fs.open(configFile, 'wx')
    await fs.write(fp, JSON.stringify(config, null, 2))
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(chalk.red('Could not write config file.'))
      throw err
    } else {
      console.warn(chalk.yellow('docs.json file already exists and was left unchanged.'))
    }
  }

  const readme = path.join(__dirname, '../init/introduction.md')
  const outputReadme = path.join(docs, 'introduction.md')
  try {
    console.log(`Writing default readme as ${outputReadme}`)
    await fs.copy(readme, outputReadme, {
      overwrite: false,
      errorOnExist: true,
    })
  } catch (err) {
    console.warn(chalk.yellow('Readme file already exists and was left unchanged.'))
  }

  console.log(chalk.green('Initialization complete!'))
  console.log(chalk.green('Run `gitdocs serve` to see your documentation.'))
}

module.exports = handler
