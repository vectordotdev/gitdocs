const fs = require('fs-extra')
const syspath = require('path')
const { ncp } = require('ncp')

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

async function dirTree (baseDir, opts = {}) {
  // ignore everything prefixed with dot or underscore by default
  opts.exclude = opts.exclude || /(?:^|[/\\])(\.|_)./

  const _walk = async path => {
    // ignore paths that match the exclude pattern
    if (opts.exclude && opts.exclude.test(path)) {
      return
    }

    // object that gets returned for this item in the tree
    const item = {
      path: syspath.basename(path),
    }

    // analyze the path, file or folder?
    const stats = await fs.stat(path)

    // if a folder, recurse into it and run this function again
    if (stats.isDirectory()) {
      // recursivily walk all sub paths
      const childPaths = await fs.readdir(path)
      const children = await Promise.all(
        childPaths.map(f => _walk(syspath.join(path, f)))
      )

      item.type = 'directory'
      // get rid of items that were excluded
      item.children = children.filter(Boolean)
    }

    // if a file, can't recurse any further
    if (stats.isFile()) {
      item.full_path = path
      item.type = 'file'
    }

    return item
  }

  // kick off recursive function with base directory
  const {
    // move up a level since we dont care about base directory
    children,
  } = await _walk(baseDir)

  return children
}

module.exports = {
  copyDir,
  dirTree,
}
