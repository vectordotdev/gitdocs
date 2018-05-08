const fs = require('fs-extra')
// const deepmerge = require('deepmerge')

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
  root: '.',
  output: '.gitdocs_output',
  host: 'localhost',
  port: 8000,
  languages: ['bash', 'json'],
  theme: 'default',
  // theme_overrides: {},
  // sidebar: [],
  // sidebar_links: [],
  // header_links: [],
}

function _getConfigFilename () {
  return FILENAMES.find(fs.pathExistsSync)
}

module.exports = async (customFile) => {
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

  // return deepmerge(DEFAULT_CONFIG, userConfig)
  return Object.assign({}, DEFAULT_CONFIG, userConfig)
}

module.exports.createConfig = async (name, root) => {
  if (_getConfigFilename()) {
    throw new Error('GitDocs is already initialized in this folder!')
  }

  const newConfig = {
    name,
    root,
    sidebar_links: [
      { text: 'GitHub', href: 'https://github.com/timberio/gitdocs', target: '_blank' },
      { text: 'Troubleshooting', href: 'https://github.com/timberio/gitdocs/issues', target: '_blank' },
    ],
    header_links: [
      { text: 'About', href: 'https://timber.io/about', target: '_blank' },
    ],
  }

  const configFile = FILENAMES[0]
  await fs.outputJson(configFile, newConfig, JSON_FORMAT)

  return configFile
}
