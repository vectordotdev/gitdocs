const fs = require('fs-extra')
const syspath = require('path')
const { tempDir } = require('./temp')
// const deepmerge = require('deepmerge')

const FILENAMES = [
  '.gitdocs.json',
  '.gitdocs.js',
]

const JSON_FORMAT = {
  spaces: 2,
}

const DEFAULT_CONFIG = {
  name: 'GitDocs',
  // logo: '',
  root: '.',
  output: 'docs_build',
  temp: tempDir(),
  host: 'localhost',
  port: 8000,
  languages: ['bash', 'json'],
  theme: 'default',
  theme_custom: {
    syntaxTheme: 'prism',
    syntaxLineNumbers: false,
  },
  // sidebar: [],
  sidebar_links: [],
  header_links: [],
}

function _getConfigFilename () {
  return FILENAMES.find(fs.pathExistsSync)
}

function _readConfigFile (file) {
  const ext = syspath.extname(file)

  return ext === '.js'
    ? require(syspath.resolve(file))
    : fs.readJson(file)
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
  const userConfig = configFile ? await _readConfigFile(configFile) : {}

  // return deepmerge(DEFAULT_CONFIG, userConfig)
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  }
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
