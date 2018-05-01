import helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { minify } from 'html-minifier'
import serverEntry from '../themes/server'

export default async function (url, props, bundleFiles) {
  const app = serverEntry(url, props)
  const sheet = new ServerStyleSheet()

  const rendered = renderToString(sheet.collectStyles(app))
  const helmetData = helmet.renderStatic()
  const styleTags = sheet.getStyleTags()

  const scripts = bundleFiles.map(bundle =>
    `<script type="text/javascript" src="/${bundle}"></script>`)

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
        ${styleTags}
      </head>
      <body ${helmetData.bodyAttributes.toString()}>
        ${helmetData.noscript.toString()}

        <div id="gitdocs-app">${rendered}</div>
        ${scripts.join('\n')}
      </body>
    </html>
  `

  return props.env === 'production'
    ? minify(html, {
      minifyCSS: true,
      collapseWhitespace: true,
      removeComments: true,
    })
    : html
}
