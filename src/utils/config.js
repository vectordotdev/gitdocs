import path from 'path'
import fs from 'fs-extra'
import deepmerge from 'deepmerge'
import objectPath from 'object-path'

const FILENAMES = [
  '.gitdocs',
  '.gitdocs.json'
]

const DEFAULTS = {
  root: 'docs',
  output: 'docs/dist',
  sidebar: {

  },
  theme: {

  }
}

function findConfig () {
  const filename = FILENAMES.find(fs.pathExistsSync)
  return filename ? path.resolve(filename) : null
}

function get (key) {
  const configFile = findConfig()

  // no custom user config
  if (!configFile) {
    return DEFAULTS
  }

  try {
    const userData = fs.readJsonSync(configFile)
    const mergedData = deepmerge(DEFAULTS, userData)

    return key
      ? objectPath.get(mergedData, key.split('.'))
      : mergedData
  } catch (err) {
    // make sure config value has valid json
    throw new Error(`Could not read ${configFile}. Is it valid JSON?`)
  }
}

function set (key, value) {
  const configFile = findConfig()
  const data = get()

  objectPath.set(data, key, value)

  fs.outputJsonSync(configFile, data, {
    spaces: 2
  })
}

export default {
  get,
  set
}
