const fs = require('fs-extra')
const path = require('path')
const git = require('simple-git/promise')
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

function cloneExternals (dir, sources) {
  // Ensure the tmp directory is cleared out
  fs.emptyDirSync(dir)

  // Map sources into an array of clone requests
  const requests = sources.map(async (s) => {
    // Check for proper source configuration
    if (!s.url) warn(warnings.url)
    if (!s.name) warn(warnings.name)

    // Print loading status
    log(`Fetching ${s.url}...`)

    // Override defaults with source config
    const source = { ...defaults, ...s }

    // Target directory for the cloned repo
    const target = `${dir}/${source.name}`

    // Clone the source folder to our tmp directory
    await git().clone(source.url, target)

    // Ensure the proper branch is checked out
    return git(target).checkout(source.branch)
  })

  // Wait for all cloning to finish
  return Promise
    .all(requests)
    .catch(err => error(`Clone error ${err}`))
}

function extractDocs (reposDir, externalsDir, sources) {
  // Ensure the tmp directory is cleared out
  fs.emptyDirSync(reposDir)

  // Valid external sources will be collected here
  const externals = []

  sources.forEach(s => {
    // Get the root path for the external source
    const rootPath = s.root || defaults.root
    const outputPath = `${reposDir}/${s.name}`

    // Get the actual location of the docs
    const docsRoot = path.resolve(
      `${externalsDir}/${s.name}`,
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
  const {
    temp,
    sources,
  } = config

  const externalsDir = `${temp}/externals`
  const reposDir = `${temp}/repos`

  // Clone all external sources into externals folder
  await cloneExternals(externalsDir, sources)

  // Extract docs directories and move to gitdocs tmp folder
  return extractDocs(reposDir, externalsDir, sources)
}
