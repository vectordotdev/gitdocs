const fs = require('fs-extra')
const axios = require('axios')
const { getFrontmatterWithContent } = require('./frontmatter')

async function _fetchSource (source) {
  const results = /^(.+?):\/\/.+$/.exec(source)
  const sourceType = results ? results[1] : 'local'

  switch (sourceType) {
    case 'git': {
      throw new Error('Git sources are not supported yet.')
    }

    case 'http':
    case 'https': {
      const {
        data,
      } = await axios.get(source)

      return data
    }

    case 'local':
    default: {
      if (!await fs.pathExists(source)) {
        throw new Error(`Could not find source: ${source}`)
      }

      return fs.readFile(source, 'utf8')
    }
  }
}

module.exports = async (data) => {
  let { content } = await getFrontmatterWithContent(data.file)

  if (data.source) {
    const remoteContent = await _fetchSource(data.source)

    switch (data.source_inject) {
      case 'before':
        content = `${remoteContent}\n\n${content}`
        break

      case 'after':
        content = `${content}\n\n${remoteContent}`
        break

      default:
        content = remoteContent
        break
    }
  }

  return content
}
