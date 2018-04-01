import util from 'util'

/**
 * Log objects in their entirety so we can see everything in debug output.
 */
export function deepToString(object) {
  return util.inspect(object, { colors: true, depth: null })
}

/**
 * Better typeof.
 */
export function typeOf(o) {
  if (Number.isNaN(o)) return 'nan'
  return Object.prototype.toString
    .call(o)
    .slice(8, -1)
    .toLowerCase()
}
