import path from 'path'

function _removeBase (str, base, replaceWith = '') {
  const pattern = new RegExp(`^${base}`)
  return str.replace(pattern, replaceWith)
}

function _removeExtAndIdx (str) {
  const patternIdx = /(.*?)\/(?:index)?$/
  const patternExt = new RegExp(`\\.${path.extname(str).slice(1)}$`)

  return str
    .replace(patternExt, '')
    .replace(patternIdx, '$1')
}

export function routify (str, base = '') {
  const route = _removeBase(_removeExtAndIdx(str), base)
  const prepend = route.charAt(0) !== '/' && route !== '' ? '/' : ''
  const append = route.slice(-1) !== '/' && route !== '/' ? '/' : ''

  return `${prepend}${route}${append}`
}

export function outputify (str, opts = {}) {
  const outputDir = _removeExtAndIdx(str)
  const output = opts.ext
    ? `${outputDir}/index.${opts.ext}`
    : `${outputDir}/`

  return opts.replace
    ? _removeBase(output, opts.replace[0], opts.replace[1])
    : output
}

export function titlify (str) {
  return path.basename(_removeExtAndIdx(str))
    .split('-')
    .map(i => `${i.charAt(0).toUpperCase()}${i.substr(1)}`)
    .join(' ')
}
