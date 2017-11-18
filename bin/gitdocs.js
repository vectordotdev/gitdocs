#!/usr/bin/env node
const yargs = require('yargs')
const execSync = require('child_process').execSync
const fs = require('fs-extra')
const cwd = process.cwd()
const chalk = require('chalk')

var argv = yargs.usage("$0 command")
  .command("serve", "serve the docs", function (yargs) {
    execSync(
      `cd node_modules/gitdocs && node_modules/react-static/bin/react-static start`,
      { env: Object.assign({ GITDOCS_CWD: cwd }, process.env), stdio: [1,2,3] }
    )
  })
  .command("build", "build the docs", function (yargs) {
    execSync(
      `cd node_modules/gitdocs && node_modules/react-static/bin/react-static build`,
      { env: Object.assign({ GITDOCS_CWD: cwd }, process.env), stdio: [1,2,3] }
    )
    fs.copySync('node_modules/gitdocs/dist', 'dist-docs')
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv
