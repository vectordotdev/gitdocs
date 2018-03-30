import path from 'path'
import fs from 'fs-extra'
import deepmerge from 'deepmerge'

const FILENAMES = {
  docs: 'docs.json',
  sidebar: 'sidebar.json',
  theme: 'theme.json'
}

const DEFAULTS = {
  docs: {

  },
  sidebar: {

  },
  theme: {

  }
}

export default function (dir = 'docs') {
  const baseDir = path.resolve(process.cwd(), dir, 'config')

  const get = (namespace, key) => {
    if (!FILENAMES[namespace]) {
      throw new Error(`"${namespace}.json" is not a valid config file`)
    }

    try {
      const filename = path.resolve(baseDir, FILENAMES[namespace])
      const userData = fs.pathExistsSync(filename) ? fs.readJsonSync(filename) : {}
      const data = deepmerge(DEFAULTS[namespace], userData)

      return key ? data[key] : data
    } catch (err) {
      // make sure config value has valid json
      throw new Error(`Could not read config file at ${filename}`)
    }
  }

  const save = (namespace, key, value) => {
    const data = get(namespace)
    const filename = path.resolve(baseDir, FILENAMES[namespace])

    data[key] = value

    fs.outputJsonSync(filename, data, {
      spaces: 2
    })
  }

  return {
    get,
    save
  }
}
