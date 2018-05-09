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

// Tmp directories uses to clone and extract docs
const directories = {
  tmp: '.gitdocs_tmp',
  externals: '.gitdocs_externals'
}

function checkoutBranch (repo, source) {
  return repo
    .getBranch(`refs/remotes/origin/${source.branch}`)
    .then(b => repo.checkoutRef(b))
}

function cloneExternals (sources) {
  // Ensure the externals directory is cleared out
  fs.removeSync(directories.externals)

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
    const repo = await git.Clone(source.url, `${directories.externals}/${source.name}`)
    return checkoutBranch(repo, source)
  })

  // Wait for all cloning to finish
  return Promise
    .all(requests)
    .catch(err => error(`Clone error ${err}`))
}

function extractDocs (sources) {
  // Valid external sources will be collected here
  const externals = []

  // Ensure the tmp directory is cleared out
  fs.removeSync(directories.tmp)

  sources.forEach(s => {
    // Get the root path for the external source
    const rootPath = s.root || defaults.root

    // Get the actual location of the docs
    const docsRoot = path.resolve(
      `${directories.externals}/${s.name}`,
      rootPath
    )

    // Warn if the docs root doesn't exist
    if (!fs.existsSync(docsRoot)) {
      return warn(`No docs root found for ${s.name || 'source'}, skipping...`)
    }

    // Add to the list of valid external doc sources
    externals.push(s.name)

    // Move the external docs repo to our tmp folder
    fs.copySync(docsRoot, `${directories.tmp}/${s.name}`)
  })

  return externals
}

module.exports = async (config) => {
  return false
  // If we have no external repositories defined return early
  if (!config.sources) return false

  // Clone all external sources into externals folder
  await cloneExternals(config.sources)

  // Extract docs directories and move to gitdocs tmp folder
  const externals = extractDocs(config.sources)

  // Ensure our externals directory is cleared out
  fs.removeSync(directories.externals)

  return externals
}
