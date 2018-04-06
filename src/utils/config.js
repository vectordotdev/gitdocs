import path from 'path'
import fs from 'fs-extra'
import deepmerge from 'deepmerge'
import objectPath from 'object-path'

const FILENAMES = [
  '.gitdocs',
  '.gitdocs.json',
]

const JSON_FORMAT = {
  spaces: 2,
}

const DEFAULT_CONFIG = {
  root: 'docs',
  output: 'docs/_dist',
  sidebar: {

  },
  theme: {

  },
}

async function _safeRead (file) {
  try {
    return await fs.readJson(file)
  } catch (err) {
    throw new Error(`Could not read ${file}`)
  }
}

export default async function (customFile) {
  if (customFile) {
    // prioritize custom config file if passed
    FILENAMES.unshift(customFile)

    if (!await fs.pathExists(customFile)) {
      throw new Error(`Config file was not found: ${customFile}`)
    }
  }

  const configFile = FILENAMES.find(fs.pathExistsSync)
  const userConfig = configFile ? await _safeRead(configFile) : {}
  const masterConfig = deepmerge(DEFAULT_CONFIG, userConfig)

  return {
    configFile,
    get: (key) => {
      return key
        ? objectPath.get(masterConfig, key.split('.'))
        : masterConfig
    },
    set: async (key, value) => {
      objectPath.set(userConfig, key, value)

      await fs.outputJson(configFile, userConfig, JSON_FORMAT)
    },
    create: async (projectName, root) => {
      const name = projectName || path.basename(process.cwd())

      if (await fs.pathExists(configFile)) {
        throw new Error('GitDocs is already initialized in this folder!')
      }

      const newConfig = { name }

      if (root !== DEFAULT_CONFIG.root) {
        newConfig.root = root
      }

      await fs.outputJson(FILENAMES[0], newConfig, JSON_FORMAT)
    },
  }
}
