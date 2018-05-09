const tmp = require('tmp')

function tempDir () {
  tmp.setGracefulCleanup()

  const dir = tmp.dirSync({
    prefix: 'gitdocs-',
  })

  return dir.name
}

module.exports = {
  tempDir,
}
