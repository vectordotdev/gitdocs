import glob from 'glob'

export async function megaGlob (patterns, opts = {}) {
  patterns = Array.isArray(patterns) ? patterns : [patterns]

  const files = await Promise.all(
    patterns.map(pattern =>
      new Promise((resolve, reject) => {
        glob(pattern, opts, (err, data) => {
          err ? reject(err) : resolve(data)
        })
      })
    )
  )

  return files.reduce((a, b) => a.concat(b))
}
