/* eslint-disable import/first, import/no-dynamic-require */
require('babel-register')
require('react-static/lib/utils/binHelper')
const nodePath = require('path')
const { start } = require('react-static/node')
const chalk = require('chalk')
const serve = require('serve')

const getConfig = require(nodePath.resolve(__dirname, '../../static.config.js')).default

module.exports = function handler ({ output, port, path }) {
  if (path) {
    console.log(chalk.green(`Serving from: ${path}`))
    serve(path, {
      port,
    })
  } else {
    console.log('Serving from: docs...')
    const config = getConfig({ output })
    start({
      config,
    })
  }
}
