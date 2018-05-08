const path = require('path')
const execa = require('execa')

async function run (cmd, expectingError) {
  const gitdocs = path.resolve(__dirname, '../bin/gitdocs')

  const result = await execa.shell(`${gitdocs} ${cmd || ''}`, {
    reject: !expectingError,
  })

  return result
}

module.exports = {
  run,
}
