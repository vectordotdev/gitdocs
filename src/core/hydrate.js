import fs from 'fs-extra'
import axios from 'axios'

async function _getFromSource (source) {
  const results = /^(.+?):\/\/.+$/.exec(source)
  const sourceType = results ? results[1] : 'local'

  switch (sourceType) {
    case 'git': {
      throw new Error('Git sources are not supported yet.')
    }

    case 'http':
    case 'https': {
      const { data } = await axios.get(source)
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

export default async function (route) {
  const { source } = route.data

  if (source) {
    route.content = await _getFromSource(source)
  }

  return route
}
