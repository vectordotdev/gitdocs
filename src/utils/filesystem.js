import fs from 'fs-extra'

/**
 * Check if a directory exists.
 */
export function directoryExists(dir) {
  try {
    return fs.statSync(dir).isDirectory()
  } catch (e) {
    return false
  }
}
