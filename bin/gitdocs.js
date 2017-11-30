#!/usr/bin/env node
/* eslint-disable */
const yargs = require('yargs')
const execSync = require('child_process').execSync
const fs = require('fs-extra')
const chalk = require('chalk')
const cwd = process.cwd()

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
        `cd node_modules/gitdocs && node_modules/react-static/bin/react-static start`,
        {
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
        `cd node_modules/gitdocs && node_modules/react-static/bin/react-static build`,
        {
          env: Object.assign({
            GITDOCS_CWD: cwd
          }, process.env),
          stdio: [1,2,3]
        }
      )
      fs.copySync('node_modules/gitdocs/dist', argv.output)
    }
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv
