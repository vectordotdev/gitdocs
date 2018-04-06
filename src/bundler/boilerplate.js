import path from 'path'
import fs from 'fs-extra'

const BOILERPLATE_DIR = path.resolve(__dirname, '../../boilerplate')

export default async function (baseDir) {
  if (await fs.pathExists(baseDir)) {
    return
  }

  await fs.copy(BOILERPLATE_DIR, baseDir)
}
