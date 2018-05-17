const fs = require('fs-extra')
const readline = require('readline')
const matter = require('gray-matter')

const DELIMITER = '---'

function _parse (str) {
  return matter(str, {
    language: 'yaml',
    delimiters: DELIMITER,
  })
}

/**
 * only read file until end of the front matter.
 * prevents having to read an entire file into
 * memory just to get the metadata.
 */
function getFrontmatter (file) {
  const lines = []
  const input = fs.createReadStream(file)
  const reader = readline.createInterface({ input })

  // whether we have found the start of the front matter block
  let delimSeen = false

  // read the file stream line by line
  reader.on('line', line => {
    // found some content in the file, but it's not front matter,
    // so assuming file has no front matter
    if (!delimSeen && line !== '' && line !== DELIMITER) {
      reader.close()
    }

    if (line === DELIMITER) {
      // end of frontmatter was found
      if (delimSeen) {
        reader.close()
      // start of frontmatter was found
      } else {
        delimSeen = true
      }
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
      const { data } = _parse(fm)

      resolve(data)
    })
  })
}

/**
 * reads an entire file into memory and
 * extracts the front matter.
 */
async function getFrontmatterWithContent (file) {
  const fileContent = await fs.readFile(file, 'utf8')
  return _parse(fileContent.trim())
}

module.exports = {
  getFrontmatter,
  getFrontmatterWithContent,
}
