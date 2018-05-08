const { version } = require('../../package.json')
const { log } = require('../utils/emit')

module.exports = async (args, config) => {
  log(`GitDocs v${version}`, true)
}
