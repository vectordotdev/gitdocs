import path from 'path'
import fs from 'fs-extra'
import helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { minify } from 'html-minifier'
import serverEntry from '../templates/server'

async function generatePage (app) {
  const rendered = renderToString(app)
  const helmetData = helmet.renderStatic()
  const bundleFile = 'index.js'

  const html = `
    <!doctype html>
    <html ${helmetData.htmlAttributes.toString()}>
      <head>
        ${helmetData.title.toString()}
        ${helmetData.base.toString()}
        ${helmetData.meta.toString()}
        ${helmetData.link.toString()}
        ${helmetData.style.toString()}
        ${helmetData.script.toString()}
      </head>
      <body ${helmetData.bodyAttributes.toString()}>
        ${helmetData.noscript.toString()}

        <div id="gitdocs-app">${rendered}</div>
        <script type="text/javascript" src="${bundleFile}"></script>
      </body>
    </html>
  `

  return minify(html, {
    collapseWhitespace: true,
  })
}

export default async function (tree, props, afterEach) {
  const _recursive = items => Promise.all(
    items.map(async item => {
      if (item.output) {
        const entry = serverEntry(item, tree, props)
        const rendered = await generatePage(entry)
        const output = path.join(item.output, 'index.html')

        await fs.outputFile(output, rendered)

        typeof afterEach === 'function' &&
          afterEach(item)
      }

      if (item.children) {
        item.children = await _recursive(item.children)
      }
    })
  )

  return _recursive(tree)
}
