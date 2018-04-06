import path from 'path'

export function removeExt (str, replaceWith = '') {
  const ext = path.extname(str)
  const regex = new RegExp(`\\.${ext.slice(1)}$`)
  return str.replace(regex, replaceWith)
}

export function replaceBase (str, baseOld, baseNew) {
  const pattern = new RegExp(`^${baseOld}`)
  return str.replace(pattern, baseNew)
}

export function routify (str) {
  const pattern = /(.*?)index(?:\.[\w]+)?$/
  return removeExt(str.replace(pattern, '$1'), '/')
}

export function htmlify (str) {
  const pattern = /\/(?:index)?$/
  const filepath = removeExt(str).replace(pattern, '')
  return `${filepath}/index.html`
}
