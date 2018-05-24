const path = require('path')
const execa = require('execa')

async function run (cmd, opts = {}) {
  const gitdocs = path.resolve(__dirname, '../bin/gitdocs')
  return execa(gitdocs, cmd.split(' '), opts)
}

module.exports = {
  run,
}
