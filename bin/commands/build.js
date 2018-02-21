import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'

export default function buildHandler ({ argv, cwd, reactStatic, reactStaticWorkDir }) {
  console.log(`Building your docs at "${argv.output}"`)
  execSync(`${reactStatic} build`, {
    cwd: reactStaticWorkDir,
    env: Object.assign(
      {
        GITDOCS_CWD: cwd,
        version: argv['doc-version'],
      },
      process.env,
    ),
    stdio: [process.stdin, process.stdout, process.stderr],
  })

  const distDir = path.join(reactStaticWorkDir, 'dist')
  fs.copySync(distDir, argv.output)
}
