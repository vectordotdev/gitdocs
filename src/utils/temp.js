const tmp = require('tmp')

const namespaces = {
  codegen: '@codegen',
  static: '@static',
  repos: '@repos',
}

function tempDir () {
  tmp.setGracefulCleanup()

  const dir = tmp.dirSync({
    prefix: 'gitdocs-',
  })

  return dir.name
}

module.exports = {
  namespaces,
  tempDir,
}
