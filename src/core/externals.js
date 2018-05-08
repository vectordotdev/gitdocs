const fs = require('fs-extra')
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
	root: 'docs'
}

module.exports = async (config) => {
	// If we have no external repositories defined return early
	if (!config.sources) return false

	// Ensure the tmp directory is cleared out
	fs.removeSync(config.tmp)

	// Map sources into an array of clone requests
	const requests = config.sources.map(s => {
		// Check for proper source configuration
		if (!s.url) warn(warnings.url)
		if (!s.name) warn(warnings.name)

		// Print loading status
		log(`Fetching ${s.url}...`)

		// Override defaults with source config
		let source = Object.assign(s, defaults)

		// Clone the source folder to our tmp directory
		return git.Clone(source.url, `${config.tmp}/${source.name}`)
	})

	// Wait for all cloning to finish
	const cloned = await Promise
		.all(requests)
		.catch(err => error(`Clone error ${err}`))

	return cloned
}
