const syspath = require('path')
const { indexFilenames } = require('../core/filesystem')

function escapeForRegex (str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

function removeExt (str) {
  return str.replace(/\.[^/.]+$/, '')
}

function removeIndex (str) {
  const files = indexFilenames.map(removeExt).join('|')
  const pattern = new RegExp(`(.*)(${files})(\\.|$).*$`)

  return str.replace(pattern, '$1')
}

/**
 * removes leading and trailing slashes so
 * we can normalize them later on.
 */
function removeSlashes (str) {
  return str.replace(/^\/|\/$/g, '')
}

/**
 * turns a file path into a formatted title,
 * removing any index files and symbols. e.g.
 * some-path/index.md ==> Some Path
 */
function titlify (str) {
  // trim stuff from the end of the string
  const trimmed = removeIndex(removeExt(str))

  // capitalize each word of the filename
  return syspath.basename(trimmed)
    .split('-')
    .map(i => `${i.charAt(0).toUpperCase()}${i.substr(1)}`)
    .join(' ')
}

function routify (str, base = '') {
  // turn string into a slug
  const slug = str
    .trim()
    .toLowerCase()
    .replace(/ /g, '-')

  // trim stuff from the string
  const normalized = removeSlashes(removeIndex(removeExt(slug)))

  // wrap in leading and trailing slashes
  return `/${normalized}${normalized !== '' ? '/' : ''}`
}

module.exports = {
  escapeForRegex,
  removeExt,
  removeIndex,
  removeSlashes,
  titlify,
  routify,
}
