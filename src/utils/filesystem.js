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

module.exports = {
  copyDir,
}
