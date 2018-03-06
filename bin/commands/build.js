/* eslint-disable import/first, import/no-dynamic-require */
require('babel-register')
require('react-static/lib/utils/binHelper')
const path = require('path')
const { build } = require('react-static/node')

const getConfig = require(path.resolve(__dirname, '../../static.config.js')).default

module.exports = function buildHandler ({ output, docVersion }) {
  console.log(`Building your docs at: "${output}"`)
  try {
    const config = getConfig({ output, docVersion })
    return build({
      config,
      silent: false,
    })
  } catch (err) {
    console.log(err)
  }
}
