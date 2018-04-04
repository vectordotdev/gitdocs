import fs from 'fs-extra'
import showdown from 'showdown'

export default async function (data) {
  const converter = new showdown.Converter()
  const content = await fs.readFile(data.file, 'utf8')

  return converter.makeHtml(content)
}
