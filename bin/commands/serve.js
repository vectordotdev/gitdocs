import chalk from 'chalk'
import { execSync } from 'child_process'
import serve from 'serve'

export default function handler ({ argv, cwd, reactStatic, reactStaticWorkDir }) {
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
