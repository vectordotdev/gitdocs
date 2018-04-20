import path from 'path'
import execa from 'execa'

export async function run (cmd, expectingError) {
  const gitdocs = path.resolve(__dirname, '../bin/gitdocs_test')

  const result = await execa.shell(`${gitdocs} ${cmd || ''}`, {
    reject: !expectingError,
  })

  return result
}
