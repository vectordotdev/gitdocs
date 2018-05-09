const syspath = require('path')

function _escapeForRegex (str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

function _removeBase (str, base, replaceWith = '') {
  const pattern = new RegExp(`^${_escapeForRegex(base)}`)
  return str.replace(pattern, replaceWith)
}

function _removeExtAndIdx (str) {
  const ext = syspath.extname(str).slice(1)

  const patternIdx = /(.*?)\/(?:index)?$/
  const patternExt = new RegExp(`\\.${_escapeForRegex(ext)}$`)

  return str
    .replace(patternExt, '')
    .replace(patternIdx, '$1')
}

function routify (str, base = '') {
  const route = _removeBase(_removeExtAndIdx(str), base)
  const prepend = route.charAt(0) !== '/' && route !== '' ? '/' : ''
  const append = route.slice(-1) !== '/' && route !== '/' ? '/' : ''

  return `${prepend}${route}${append}`.toLowerCase()
}

function outputify (str, opts = {}) {
  const outputDir = _removeExtAndIdx(str)
  const output = opts.ext
    ? `${outputDir}/index.${opts.ext}`
    : `${outputDir}/`

  return opts.replace
    ? _removeBase(output, opts.replace[0], opts.replace[1])
    : output
}

function titlify (str) {
  return syspath.basename(_removeExtAndIdx(str))
    .split('-')
    .map(i => `${i.charAt(0).toUpperCase()}${i.substr(1)}`)
    .join(' ')
}

module.exports = {
  routify,
  outputify,
  titlify,
}
