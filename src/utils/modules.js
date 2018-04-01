import path from 'path'
import resolve from 'resolve'

/**
 * Get the path to an npm module.
 */
export function modulePath(module, basedir = process.cwd()) {
  return path.dirname(resolve.sync(`${module}/package.json`, { basedir }))
}
