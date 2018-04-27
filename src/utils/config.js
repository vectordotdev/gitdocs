import path from 'path'
import fs from 'fs-extra'
import deepmerge from 'deepmerge'
// import objectPath from 'object-path'

const FILENAMES = [
  '.gitdocs',
  '.gitdocs.json',
]

const JSON_FORMAT = {
  spaces: 2,
}

const DEFAULT_CONFIG = {
  name: 'GitDocs',
  // logo: '',
  root: 'docs',
  output: '.gitdocs_output',
  theme: 'default',
  // theme_overrides: {},
  server: {
    host: 'localhost',
    port: 8000,
  },
}

function _getConfigFilename () {
  return FILENAMES.find(fs.pathExistsSync)
}

export async function createConfig (projectName, root) {
  if (_getConfigFilename()) {
    throw new Error('GitDocs is already initialized in this folder!')
  }

  const newConfig = {
    name: projectName || path.basename(process.cwd()),
  }

  if (root !== DEFAULT_CONFIG.root) {
    newConfig.root = root
  }

  await fs.outputJson(FILENAMES[0], newConfig, JSON_FORMAT)
}

export default async function (customFile) {
  // prioritize custom config file if passed,
  // but still fallback to default files
  if (customFile) {
    FILENAMES.unshift(customFile)

    if (!await fs.pathExists(customFile)) {
      throw new Error(`Config file was not found: ${customFile}`)
    }
  }

  const configFile = _getConfigFilename()
  const userConfig = configFile ? await fs.readJson(configFile) : {}

  return deepmerge(DEFAULT_CONFIG, userConfig)

  //   get: (key) => {
  //     return key
  //       ? objectPath.get(masterConfig, key.split('.'))
  //       : masterConfig
  //   }
}
