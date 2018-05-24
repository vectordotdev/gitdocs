const fs = require('fs-extra')
const readline = require('readline')
const matter = require('gray-matter')

const DELIMITER_OPEN = '---'
const DELIMITER_CLOSE = '---'

function parseFrontmatter (str) {
  const content = typeof str !== 'string'
    ? str.toString('utf8')
    : str

  return matter(content.trim(), {
    language: 'yaml',
    delimiters: [DELIMITER_OPEN, DELIMITER_CLOSE],
  })
}

/**
 * only read file until end of the front matter.
 * prevents having to read an entire file into
 * memory just to get the metadata.
 */
function getFrontmatterOnly (file) {
  const lines = []
  const input = fs.createReadStream(file)
  const reader = readline.createInterface({ input })

  // whether we have found the start of the front matter block
  let delimSeen = false

  // read the file stream line by line
  reader.on('line', line => {
    // found some content in the file, but it's not front matter,
    // so assuming file has no front matter
    if (!delimSeen && line !== '' && line !== DELIMITER_OPEN) {
      reader.close()
    }

    // start of frontmatter was found
    if (line === DELIMITER_OPEN) {
      delimSeen = true
    }

    // end of frontmatter was found
    if (line === DELIMITER_CLOSE && delimSeen) {
      reader.close()
    }

    lines.push(line)
  })

  return new Promise((resolve, reject) => {
    reader.on('error', err => reject(err))
    reader.on('close', () => input.close())

    // done reading the front matter and read stream has been closed
    input.on('close', () => {
      // concat the lines into a string to be parsed into an object
      const fm = lines.join('\n').trim()
      const { data } = parseFrontmatter(fm)

      resolve(data)
    })
  })
}

module.exports = {
  parseFrontmatter,
  getFrontmatterOnly,
}
