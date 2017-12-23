const execSync = require('child_process').execSync
const fs = require('fs-extra')
const path = require('path')

const buildHandler = ({ argv, cwd, reactStatic, reactStaticWorkDir }) => {
  console.log('outputting...', argv.output)
  execSync(
    `${reactStatic} build`,
    {
      cwd: reactStaticWorkDir,
      env: Object.assign({
        GITDOCS_CWD: cwd,
        version: argv['doc-version'],
      }, process.env),
      stdio: [1, 2, 3],
    })

  const distDir = path.join(reactStaticWorkDir, 'dist')
  fs.copySync(distDir, argv.output)
}

module.exports = buildHandler
