import fs from 'fs-extra'
import readline from 'readline'
import matter from 'gray-matter'

const DELIMITER = '---'

function _parseFrontmatter (str) {
  return matter(str, {
    language: 'yaml',
    delimiters: DELIMITER,
  })
}

export async function getContent (file) {
  const fileContent = await fs.readFile(file, 'utf8')
  const { content } = _parseFrontmatter(fileContent.trim())

  return content
}

export function getFrontmatter (file) {
  const lines = []
  const input = fs.createReadStream(file)
  const reader = readline.createInterface({ input })

  let delimSeen = false

  reader.on('line', line => {
    // no frontmatter was found
    if (!delimSeen && line !== '' && line !== DELIMITER) {
      reader.close()
    }

    lines.push(line)

    if (line === DELIMITER) {
      // end of frontmatter was found
      if (delimSeen) {
        reader.close()
      // start of frontmatter was found
      } else {
        delimSeen = true
      }
    }
  })

  return new Promise((resolve, reject) => {
    reader.on('error', err => reject(err))
    reader.on('close', () => input.close())

    input.on('close', () => {
      const fm = lines.join('\n').trim()
      const { data } = _parseFrontmatter(fm)

      resolve(data)
    })
  })
}
