const fs = require('fs-extra')
const syspath = require('path')
const ourpath = require('../utils/path')
const source = require('../utils/source')
const { getFrontmatter } = require('../utils/frontmatter')
const { namespaces } = require('../utils/temp')
const { warn } = require('../utils/emit')

/**
 * prevents having both something/index.md and something.md,
 * since we add trailing slashes to all static routes.
 */
async function checkForIndexConflict (file) {
  const dir = syspath.dirname(file)
  const ext = syspath.extname(file)
  const base = syspath.basename(file, ext)
  const indexFile = `${dir}/${base}/index${ext}`

  if (indexFile !== file && await fs.pathExists(indexFile)) {
    throw new Error(`Conflicting files were found! Please use one or the other.\n\t- ${file}\n\t- ${indexFile}`)
  }
}

/**
 * show warning if you have a file and folder with the same name
 * such as something/* and something.md
 */
async function warnForIndexConflict (file) {
  const dir = syspath.dirname(file)
  const base = syspath.basename(file, syspath.extname(file))
  const conflictDir = `${dir}/${base}`

  if (await fs.pathExists(conflictDir)) {
    warn(`Consider moving ${file} to ${conflictDir}/index.md`)
  }
}

async function hydrate (file, baseDir, outputDir, shouldGetContent) {
  const data = await getFrontmatter(file)

  const url = ourpath.routify(data.url || file, baseDir)
  const title = data.title || ourpath.titlify(url)
  const fileOutput = ourpath.outputify(file, {
    ext: 'html',
    replace: [baseDir, outputDir],
  })

  const item = {
    url,
    title,
    file,
    fileOutput,
  }

  if (shouldGetContent) {
    Object.assign(item, await source(item.file))
  }

  return item
}

async function buildManifest (env, opts = {}) {
  const files = []
  const filemap = {}
  const urlmap = {}

  const _walk = async (path, ignorePattern, baseDir) => {
    const dir = baseDir || path

    const ext = syspath.extname(path)
    const stats = await fs.stat(path)

    if (ignorePattern && ignorePattern.test(path)) {
      return null
    }

    if (stats.isFile()) {
      if (opts.extensions && opts.extensions.indexOf(ext) === -1) {
        return null
      }

      await warnForIndexConflict(path)
      await checkForIndexConflict(path)

      const isIndex = /\/index\.[\w]+$/.test(path)
      const shouldGetContent = env === 'production'
      const hydrated = await hydrate(path, dir, opts.outputDir, shouldGetContent)

      if (urlmap[hydrated.url]) {
        const duplicated = files[urlmap[hydrated.url]].file
        throw new Error(`Can't use a URL more than once: ${hydrated.url}\n\t- ${duplicated}\n\t- ${hydrated.file}`)
      }

      filemap[path] = files.push(hydrated) - 1
      urlmap[hydrated.url] = filemap[path]

      if (hydrated.draft) {
        return
      }

      return isIndex ? {
        indexLink: hydrated.url,
      } : {
        text: hydrated.title,
        link: hydrated.url,
      }
    }

    if (stats.isDirectory()) {
      const childFiles = await fs.readdir(path)
      const children = await Promise.all(
        childFiles.map(file => _walk(syspath.join(path, file), ignorePattern, dir))
      )

      const indexItem = children
        .find(item => item && item.indexLink)

      return {
        text: ourpath.titlify(path),
        link: indexItem ? indexItem.indexLink : undefined,
        children: children
          .filter(Boolean)
          .filter(({ indexLink }) => !indexLink)
          // sort children alphabetically
          .sort((a, b) => a.text > b.text),
      }
    }
  }

  const ignoredWithDotfiles = /(?:^|[/\\])(\.|_)./
  const ignoredUnderscores = /(?:^|[/\\])_./

  const {
    // move up a layer since we dont want base directory
    children: navtreeLocal,
  } = await _walk(opts.dir, ignoredWithDotfiles)

  const {
    children: navtreeExternal,
  } = await _walk(opts.reposDir, ignoredUnderscores)

  return {
    files,
    filemap,
    urlmap,
    navtree: [
      ...navtreeLocal,
      ...navtreeExternal,
    ],
  }
}

module.exports = async (env, config) => {
  if (!await fs.pathExists(config.root)) {
    throw new Error(`Could not find root documentation folder: ${config.root}`)
  }

  if (/^\//.test(config.root)) {
    throw new Error(`Root is set to an absolute path! Did you mean ".${config.root}" instead of "${config.root}"?`)
  }

  const manifest = await buildManifest(env, {
    dir: syspath.resolve(config.root),
    reposDir: syspath.resolve(config.temp, namespaces.repos),
    outputDir: syspath.resolve(config.output),
    extensions: ['.md'],
  })

  if (manifest.urlmap['/'] === undefined) {
    warn('No index file was found! Create an `index.md` at the root of your project.')
  }

  return manifest
}
