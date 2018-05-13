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

async function hydrate (data, file, baseDir, outputDir, shouldGetContent, config) {
  data.url = ourpath.routify(data.url || file, baseDir)
  data.title = data.title || ourpath.titlify(data.url)
  data.order = data.order || config.order[data.url.replace(/\/$/, "")] || null

  data.file = file
  data.fileOutput = ourpath.outputify(`${outputDir}${data.url}`, {
    ext: 'html',
  })

  if (shouldGetContent) {
    data.content = await source(data)
  }

  return data
}

async function buildManifest (env, config, opts = {}) {
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
      // Only watch for certain file extensions (defaults to *.md)
      if (opts.extensions && opts.extensions.indexOf(ext) === -1) {
        return null
      }

      // Warn if there are any route index conflicts
      await warnForIndexConflict(path)
      await checkForIndexConflict(path)

      // @TODO: Check fro Readme.md or [folder].md
      const isIndex = /\/index\.[\w]+$/.test(path)
      const shouldGetContent = env === 'production'
      const frontMatter = await getFrontmatter(path)
      const hydrated = await hydrate(frontMatter, path, dir, opts.outputDir, shouldGetContent, config)
      console.log(hydrated.order)

      // Ignore files with a `draft` status
      if (frontMatter.draft) return

      // Detect duplicate URLs
      if (urlmap[hydrated.url]) {
        const duplicated = files[urlmap[hydrated.url]].file
        throw new Error(`Can't use a URL more than once: ${hydrated.url}\n\t- ${duplicated}\n\t- ${hydrated.file}`)
      }

      filemap[path] = files.push(hydrated) - 1
      urlmap[hydrated.url] = filemap[path]

      return isIndex ? {
        indexLink: hydrated.url,
        order: hydrated.order,
        data: frontMatter,
      } : {
        text: hydrated.title,
        link: hydrated.url,
        order: hydrated.order,
        data: frontMatter
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
        order: indexItem ? indexItem.order : null,
        data: indexItem ? indexItem.data : {},
        children: children
          .filter(Boolean)
          .filter(({ indexLink }) => !indexLink)
          // Sort alphabetically
          .sort((a, b) => a.text > b.text)
          // Sort by order in config or frontmatter
          .sort((a, b) => {
            if (a.order === null && b.order !== null) return 1
            if (b.order === null && a.order !== null) return -1
            return a.order - b.order
          })
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
    throw new Error(
      `Root is set to an absolute path! Did you mean ".${config.root}" instead of "${config.root}"?`
    )
  }

  const manifest = await buildManifest(env, config, {
    dir: syspath.resolve(config.root),
    reposDir: syspath.resolve(config.temp, namespaces.repos),
    outputDir: syspath.resolve(config.output),
    extensions: ['.md'],
  })

  // fs.writeFile("./tree.json", JSON.stringify(dirtree(syspath.resolve(config.root))))
  // console.log(JSON.stringify(manifest.navtree, 0, 2))

  if (manifest.urlmap['/'] === undefined) {
    warn('No index file was found! Create an `index.md` at the root of your project.')
  }

  return manifest
}
