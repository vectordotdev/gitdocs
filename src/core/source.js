const sourceGit = require('../sources/git')
const sourceLocal = require('../sources/local')
const { dirTree } = require('./filesystem')
// const { log, styles } = require('../utils/emit')

async function walkSource (tempDir, currentDir, data) {
  const {
    source,
    source_type: type = 'local',
    source_root: root = 'docs',
    source_branch: branch = 'master',
  } = data

  // log(`Fetching ${type} source: ${styles.note(source)}`)

  let resultDir
  switch (type) {
    case 'git': {
      resultDir = await sourceGit(tempDir, source, branch, root)
      break
    }

    case 'http':
    case 'https':
    case 'static': {
      throw new Error('HTTP sources are not supported yet.')
    }

    case 'local':
    default: {
      resultDir = await sourceLocal(source, currentDir)
      break
    }
  }

  return dirTree(resultDir)
}

module.exports = {
  walkSource,
}
