import fs from 'fs-extra'
import axios from 'axios'
import { getFrontmatterWithContent } from './frontmatter'

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

export default async function (file) {
  const fm = await getFrontmatterWithContent(file)
  const result = {
    ...fm.data,
    content: fm.content,
  }

  if (result.source) {
    const remoteContent = await _fetchSource(result.source)

    switch (result.source_inject) {
      case 'before':
        result.content = `${remoteContent}\n${fm.content}`
        break

      case 'after':
        result.content = `${fm.content}\n${remoteContent}`
        break

      default:
        result.content = remoteContent
        break
    }
  }

  return result
}
