const fs = require('fs-extra')
const syspath = require('path')
const { ncp } = require('ncp')
const { parseFrontmatter } = require('../utils/frontmatter')

const INDEX_FILES = ['index', 'readme']

/**
 * whether a pathname matches an index file.
 */
function isIndexFile (path, returnIndex) {
  const filename = syspath
    .basename(path, syspath.extname(path))
    .toLowerCase()

  const idx = INDEX_FILES
    .findIndex(file => file === filename)

  return returnIndex
    ? idx
    : idx > -1
}

/**
 * checks for conflicting filenames on a path,
 * such as a duplicated index file or a folder
 * with the same base name.
 */
async function checkForConflicts (path) {
  const fileIdx = isIndexFile(path, true)
  const dir = syspath.dirname(path)

  const ext = syspath.extname(path)
  const basePath = syspath.basename(path, ext)
  const pathAsDir = syspath.join(dir, basePath)

  // don't allow something/ and something.md
  if (path !== pathAsDir && await fs.pathExists(pathAsDir)) {
    throw new Error(`Conflicting paths found (use an index file instead):\n\t- ${pathAsDir}/\n\t- ${path}`)
  }

  // don't allow index.md and readme.md
  fileIdx > -1 && await Promise.all(
    INDEX_FILES.map(async (file, idx) => {
      const checkPath = syspath.join(dir, `${file}${ext}`)

      // should not conflict with itself
      if (idx === fileIdx) {
        return
      }

      // another index file exists
      if (await fs.pathExists(checkPath)) {
        throw new Error(`Conflicting index files were found:\n\t- ${checkPath}\n\t- ${path}`)
      }
    })
  )
}

/**
 * walk a directory and return data for each item,
 * preserving the tree structure.
 */
async function dirTree (baseDir, opts = {}) {
  if (!await fs.pathExists(baseDir)) {
    throw new Error(`Could not find root folder: ${baseDir}`)
  }

  // only include files with these extensions
  opts.extensions = opts.extensions || ['.md']

  // ignore everything prefixed with dot by default
  opts.exclude = opts.exclude || /^\../

  if (!Array.isArray(opts.extensions)) {
    throw new TypeError('Extensions must be an array!')
  }

  if (!(opts.exclude instanceof RegExp)) {
    throw new TypeError('Excluded pattern must be a regular expression!')
  }

  const _walk = async path => {
    const item = {
      // resolve the path to an absolute path
      path: syspath.resolve(path),
      // keep the relative path so we can easily construct a url
      // NOTE: needs to be an empty string for the base dir, so it doesn't become part of the url
      path_relative: syspath.basename(path === baseDir ? '' : path),
    }

    // analyze the path, file or folder
    const stats = await fs.stat(item.path)
    const ext = syspath.extname(item.path)

    // make sure to exclude any paths that match the pattern
    if (opts.exclude.test(item.path_relative)) {
      return
    }

    // if a folder, recurse into it and run this function again
    if (stats.isDirectory()) {
      item.type = 'directory'

      // recursivily walk all sub paths and
      const childrenItems = await fs.readdir(item.path)
      const childrenUnfiltered = await Promise.all(
        childrenItems.map(f => _walk(syspath.join(item.path, f)))
      )

      // filter out all items that were excluded
      const children = childrenUnfiltered.filter(Boolean)

      // find the idx of the children's main index file
      const index = children.findIndex(f => isIndexFile(f.path))

      // whether the directory has an index file
      if (index > -1) {
        item.childrenIndex = index
      }

      // get rid of items that were excluded
      item.children = children
    }

    // if a file, can't recurse any further
    if (stats.isFile()) {
      item.type = 'file'

      // only include whitelisted filetypes
      if (opts.extensions.indexOf(ext) === -1) {
        return
      }

      // ensure there are no file conflicts like duplicate indexes
      await checkForConflicts(item.path)

      // index file path is put on it's directory level (the parent)
      if (isIndexFile(item.path)) {
        item.index = true
      }
    }

    return item
  }

  // kick off recursive function with base directory
  return _walk(baseDir)
}

async function getContent (path) {
  const fileContent = await fs.readFile(path)
  const { content } = parseFrontmatter(fileContent)

  return content
}

/**
 * because of https://github.com/zeit/pkg/issues/420
 */
function copyDir (from, to) {
  return new Promise((resolve, reject) => {
    ncp(from, to, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

module.exports = {
  isIndexFile,
  checkForConflicts,
  dirTree,
  getContent,
  copyDir,
}

module.exports.indexFilenames = INDEX_FILES
