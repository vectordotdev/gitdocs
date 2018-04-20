import fs from 'fs-extra'
import axios from 'axios'
import matter from 'gray-matter'
import { titlify } from '../utils/path'

async function getFromSource (source) {
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

export default async function (tree, afterEach) {
  const _recursive = items => Promise.all(
    items.map(async item => {
      if (item.file) {
        const fm = matter(await fs.readFile(item.file))
        const defaults = {
          title: titlify(item.path),
          source_inject: 'replace',
        }

        item.meta = Object.assign({}, defaults, fm.data)

        if (item.meta.source) {
          const sourceContent = await getFromSource(fm.data.source)

          switch (item.meta.source_inject) {
            case 'before':
              item.content = `${sourceContent}${fm.content}`
              break

            case 'after':
              item.content = `${fm.content}${sourceContent}`
              break

            case 'replace':
            default:
              item.content = sourceContent
              break
          }
        } else {
          item.content = fm.content
        }

        typeof afterEach === 'function' &&
          afterEach(item)
      }

      if (item.children) {
        item.children = await _recursive(item.children)
      }

      return item
    })
  )

  return _recursive(tree)
}
