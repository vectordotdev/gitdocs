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
    console.log('Serving from ./docs...')
    execSync(`${reactStatic} start`, {
      cwd: reactStaticWorkDir,
      env: Object.assign({ GITDOCS_CWD: cwd }, process.env),
      stdio: [process.stdin, process.stdout, process.stderr],
    })
  }
}

module.exports = handler
