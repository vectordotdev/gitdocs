#!/usr/bin/env node
/* eslint-disable */
const chalk = require('chalk')
const execSync = require('child_process').execSync
const fs = require('fs-extra')
const isGlobal = require('is-global')
const path = require('path')
const yargs = require('yargs')

const cwd = process.cwd()

// 3 possible cases:
//    Global install - need to go up and into node modules to find react static
//    Local install - need to go up and directly to react static because we're already in node-modules
//    Local dev - same as global
const reactStatic = isGlobal() || !__dirname.includes('/node_modules/') ?
  path.join(__dirname, '/../node_modules/react-static/bin/react-static') :
  path.join(__dirname, '../../react-static/bin/react-static')
const reactStaticWorkDir = path.join(__dirname, '..')

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
      }
    }),
    handler: argv => {
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

      const distDir = path.join(cwd, 'dist')
      fs.copySync(distDir, argv.output)
    }
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv
