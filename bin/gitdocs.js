#!/usr/bin/env node
/* eslint-disable */
const chalk = require('chalk')
const execSync = require('child_process').execSync
const fs = require('fs-extra')
const inquirer = require('inquirer')
const isGlobal = require('is-global')
const merge = require('lodash.merge')
const path = require('path')
const yargs = require('yargs')

const cwd = process.cwd()
const defaults = require('../default.json')

// 3 possible cases:
//    Global install - need to go up and into node modules to find react static
//    Local install - need to go up and directly to react static because we're already in node-modules
//    Local dev - same as global
const reactStatic = isGlobal() || !__dirname.includes('/node_modules/') ?
  path.join(__dirname, '/../node_modules/react-static/bin/react-static') :
  path.join(__dirname, '../../react-static/bin/react-static')
const reactStaticWorkDir = path.join(__dirname, '..')

const buildHandler = argv => {
  console.log('outputting...', argv.output)
  execSync(
    `${reactStatic} build`,
    {
      cwd: reactStaticWorkDir,
      env: Object.assign({
        GITDOCS_CWD: cwd
      }, process.env),
      stdio: [1,2,3]
    }
  )

  const distDir = path.join(reactStaticWorkDir, 'dist')
  fs.copySync(distDir, argv.output)
}

// commands:
// serve (port, version)
// build (version, output)
// init (@config) (create /doc, /docs/public, docs.json, etc)

var argv = yargs
  .version()
  .usage('Usage: gitdocs <command> [options]')
  .command({
    command: 'serve [path]',
    alias: 's',
    desc: chalk.gray('serve'),
    builder: yargs => yargs.options({
      'port': {
        alias: 'p',
        default: 3000,
        desc: chalk.gray('serve.port'),
        nargs: 1,
        requiresArg: true,
        type: 'number'
      }
    }),
    handler: argv => {
      execSync(
        `${reactStatic} start`,
        {
          cwd: reactStaticWorkDir,
          env: Object.assign({ GITDOCS_CWD: cwd }, process.env),
          stdio: [1,2,3]
        }
      )
    }
  })
  .command({
    command: 'build [output] [version]',
    alias: 'b',
    desc: chalk.gray('build'),
    builder: yargs => yargs.options({
      'output': {
        alias: 'o',
        default: 'docs-dist',
        desc: chalk.gray('build.output'),
        nargs: 1,
        requiresArg: true,
        type: 'string'
      },
      'version': {
        alias: 'v',
        desc: chalk.gray('build.version'),
        nargs: 1,
        requiresArg: false,
        type: 'string'
      }
    }),
    handler: argv => {
      console.log('outputting...', argv.output)
      execSync(
        `${reactStatic} build`,
        {
          cwd: reactStaticWorkDir,
          env: Object.assign({
            GITDOCS_CWD: cwd,
            version: argv.version,
          }, process.env),
          stdio: [1,2,3]
        }
      )

      const distDir = path.join(reactStaticWorkDir, 'dist')
      fs.copySync(distDir, argv.output)
    }
  })
  .command({
    command: 'init',
    alias: 'i',
    desc: chalk.gray('init'),
    handler: async argv => {
      console.log(chalk.green('Initializing GitDocs project'))

      const docs = path.join(cwd, 'docs')
      const public = path.join(docs, 'public')

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
        console.log(`Creating public directory: ${public}`)
        await fs.mkdir(public)
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
          message: 'URL of the repository where this documentation is stored.'
        }
      ])

      const configFile = path.join(docs, 'docs.json')
      const config = merge(defaults, {
        name: answers.name,
        repository: answers.repository,
        title: answers.name,
        version: '0.0.1',
        sidebar: {
          items: {
            'Introduction': 'introduction.md'
          }
        }
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
          errorOnExist: true
        })
      } catch (err) {
        console.warn(chalk.yellow('Readme file already exists and was left unchanged.'))
      }

      console.log(chalk.green('Initialization complete!'))
      console.log(chalk.green('Run `gitdocs serve` to see your documentation.'))
    }
  })
  .command({
    command: 'deploy [location]',
    alias: 'd',
    desc: chalk.gray('deploy'),
    builder: yargs => yargs.options({
      'location': {
        alias: 'l',
        default: 'gh-pages',
        desc: chalk.gray('deploy.location'),
        nargs: 1,
        requiresArg: true,
        type: 'string'
      }
    }),
    handler: async argv => {
      // Need to build first
      buildHandler({ output: 'docs-dist' })

      switch(argv.location) {
        case 'gh-pages':
          const handler = require('./deploy/gh-pages')
          const config = require(path.join(cwd, 'docs', 'docs.json'))
          handler(config)
          break;
        default:
          console.error(chalk.red(`Unknown deploy location ${argv.location} provided.`))
          process.exit(1)
      }
    }
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv
