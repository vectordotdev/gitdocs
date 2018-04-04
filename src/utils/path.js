import path from 'path'

function removeExt (str, replaceWith = '') {
  const ext = path.extname(str)
  const regex = new RegExp(`\\.${ext.slice(1)}$`)
  return str.replace(regex, replaceWith)
}

function replaceBase (str, baseOld, baseNew) {
  const pattern = new RegExp(`^${baseOld}`)
  return str.replace(pattern, baseNew)
}

function routify (str) {
  const pattern = new RegExp(`(.*?)index(?:\\.[\\w]+)?$`)
  return removeExt(str.replace(pattern, '$1'), '/')
}

function htmlify (str) {
  const pattern = /\/(?:index)?$/
  const filepath = removeExt(str).replace(pattern, '')
  return `${filepath}/index.html`
}

export default {
  removeExt,
  replaceBase,
  routify,
  htmlify
}
