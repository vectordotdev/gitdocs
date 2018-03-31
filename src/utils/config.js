import fs from 'fs-extra'
import deepmerge from 'deepmerge'
import objectPath from 'object-path'
import emit from './emit'

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

function safeRead (file) {
  try {
    return fs.readJsonSync(file)
  } catch (err) {
    throw new Error(`Could not read config file: ${file}`)
  }
}

export default function (customFile) {
  if (customFile) {
    // prioritize custom config file if passed
    FILENAMES.unshift(customFile)

    if (!fs.pathExistsSync(customFile)) {
      emit.warn(`"${customFile}" was not found, falling back to default config file`)
    }
  }

  const configFile = FILENAMES.find(fs.pathExistsSync)
  const config = configFile
    ? deepmerge(DEFAULTS, safeRead(configFile))
    : DEFAULTS

  return {
    get: (key) => {
      return key
        ? objectPath.get(config, key.split('.'))
        : config
    },

    set: (key, value) => {
      objectPath.set(config, key, value)

      fs.outputJsonSync(configFile, config, {
        spaces: 2
      })
    }
  }
}
