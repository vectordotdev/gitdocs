const fs = require('fs-extra')
const syspath = require('path')
const { tempDir } = require('./temp')
const { addToNodePath } = require('./system')
const deepmerge = require('deepmerge')
const { warn } = require('./emit')

const FILENAMES = [
  '.gitdocs.json',
  '.gitdocs.js',
]

const JSON_FORMAT = {
  spaces: 2,
}

const DEFAULT_CONFIG = {
  name: 'GitDocs',
  root: '.',
  output: '.gitdocs_build',
  static: '.static',
  temp: tempDir(),
  logo: null,
  baseURL: '/',
  domain: '',
  crawlable: true,
  host: 'localhost',
  port: 8000,
  languages: ['bash', 'json'],
  header_links: [],
  theme: 'default',
  breadcrumbs: true,
  prefix_titles: false,
  table_of_contents: {
    page: true,
    folder: true,
  },
  syntax: {
    theme: 'atom-one-light',
    renderer: 'hljs',
    lineNumbers: true,
  },
}

function getConfigFilename () {
  return FILENAMES.find(fs.pathExistsSync)
}

function readConfigFile (file) {
  const ext = syspath.extname(file)

  return ext === '.js'
    ? require(syspath.resolve(file))
    : fs.readJson(file)
}

function getExternalConfigFilename (dir, name) {
  return FILENAMES
    .map(f => `${dir}/${name}/${f}`)
    .find(fs.pathExistsSync)
}

function getExternalConfig (dir, name) {
  const file = getExternalConfigFilename(dir, name)
  return file ? readConfigFile(file) : {}
}

async function getConfig (customFile) {
  // prioritize custom config file if passed,
  // but still fallback to default files
  if (customFile) {
    FILENAMES.unshift(customFile)

    if (!await fs.pathExists(customFile)) {
      throw new Error(`Config file was not found: ${customFile}`)
    }
  }

  const configFile = getConfigFilename()
  const userConfig = configFile ? await readConfigFile(configFile) : {}
  const masterConfig = deepmerge(DEFAULT_CONFIG, userConfig)

  masterConfig.temp = syspath.resolve(masterConfig.temp)
  await fs.emptyDir(masterConfig.temp)
  addToNodePath(masterConfig.temp)

  const { root } = masterConfig
  if (/^\//.test(root)) {
    warn(`Root is set to an absolute path! Did you mean ".${root}" instead of "${root}"?`)
  }

  masterConfig.static = syspath.resolve(
    masterConfig.root,
    masterConfig.static,
  )

  return masterConfig
}

async function createConfig (name, root) {
  if (getConfigFilename()) {
    throw new Error('GitDocs is already initialized in this folder!')
  }

  const newConfig = {
    name,
    root,
  }

  const configFile = FILENAMES[0]
  await fs.outputJson(configFile, newConfig, JSON_FORMAT)

  return configFile
}

module.exports = {
  getConfig,
  getExternalConfig,
  createConfig,
}
