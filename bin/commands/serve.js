const chalk = require('chalk')
const execSync = require('child_process').execSync
const serve = require('serve')

const handler = ({ argv, cwd, reactStatic, reactStaticWorkDir }) => {
  if (argv.path) {
    console.log(chalk.green(`Serving ${argv.path}`))
    serve(argv.path, {
      port: argv.port,
    })
  } else {
    console.log('No path specified. Falling back to react-static dev server.')
    execSync(
      `${reactStatic} start`,
      {
        cwd: reactStaticWorkDir,
        env: Object.assign({ GITDOCS_CWD: cwd }, process.env),
        stdio: [1, 2, 3],
      })
  }
}

module.exports = handler
