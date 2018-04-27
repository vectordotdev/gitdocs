import path from 'path'
import resolve from 'resolve'

const PACKAGE_PREFIX = 'gitdocs-theme'

export function getTheme (name) {
  return new Promise((done, reject) => {
    const opts = {
      // basedir: process.cwd(),
      paths: [
        process.cwd(),
        path.resolve(__dirname, '../../'),
      ]
    }

    resolve(`${PACKAGE_PREFIX}-${name}`, opts, (err, res) => {
      if (err) reject(err)
      else done(res)
    })
  })
}
