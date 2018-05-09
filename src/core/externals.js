const fs = require('fs-extra')
const path = require('path')
const git = require('nodegit')
const { log, warn, error } = require('../utils/emit')

// Warnings for missing source information
const warnings = {
  url: 'Source must have a "url" defined, skipping...',
  name: 'Source must have a "name" defined, skipping...',
  branch: 'No source branch specified, defaulting to master...',
  root: 'No source root specified, defaulting to "/docs"...'
}

// Default source attributes
const defaults = {
  branch: 'master',
  root: 'docs/'
}

function checkoutBranch (repo, source) {
  return repo
    .getBranch(`refs/remotes/origin/${source.branch}`)
    .then(b => repo.checkoutRef(b))
}

function cloneExternals (dir, sources) {
  // Ensure the externals directory is cleared out
  fs.removeSync(dir)

  // Map sources into an array of clone requests
  const requests = sources.map(async (s) => {
    // Check for proper source configuration
    if (!s.url) warn(warnings.url)
    if (!s.name) warn(warnings.name)

    // Print loading status
    log(`Fetching ${s.url}...`)

    // Override defaults with source config
    const source = { ...defaults, ...s }

    // Clone the source folder to our tmp directory
    const repo = await git.Clone(source.url, `${dir}/${source.name}`)
    return checkoutBranch(repo, source)
  })

  // Wait for all cloning to finish
  return Promise
    .all(requests)
    .catch(err => error(`Clone error ${err}`))
}

function extractDocs (dir, sources) {
  // Valid external sources will be collected here
  const externals = []

  // Ensure the tmp directory is cleared out
  // fs.removeSync(dir)

  sources.forEach(s => {
    // Get the root path for the external source
    const rootPath = s.root || defaults.root
    const outputPath = `${dir}/repos/${s.name}`

    // Get the actual location of the docs
    const docsRoot = path.resolve(
      `${dir}/externals/${s.name}`,
      rootPath
    )

    // Warn if the docs root doesn't exist
    if (!fs.existsSync(docsRoot)) {
      return warn(`No docs root found for ${s.name || 'source'}, skipping...`)
    }

    // Add to the list of valid external doc sources
    externals.push({
      name: s.name,
      path: outputPath,
    })

    // Move the external docs repo to our tmp folder
    fs.copySync(docsRoot, outputPath)
  })

  return externals
}

module.exports = async (config) => {
  // If we have no external repositories defined return early
  if (!config.sources) return false

  const externalsDir = `${config.temp}/externals`

  // Clone all external sources into externals folder
  await cloneExternals(externalsDir, config.sources)

  // Extract docs directories and move to gitdocs tmp folder
  const externals = extractDocs(config.temp, config.sources)

  return externals
}
