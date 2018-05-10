const syspath = require('path')
const { minify } = require('html-minifier')
const { renderToString } = require('react-dom/server')
const { Helmet } = require('react-helmet')
const babelRequire = require('../utils/babel')
const { hijackConsole } = require('../utils/emit')

module.exports = async (env, route, props, bundleFiles) => {
  const scripts = bundleFiles
    .filter(bundle => syspath.extname(bundle) === '.js')
    .map(bundle => `<script type="text/javascript" src="/${bundle}"></script>`)
    .join('\n')

  if (env === 'development') {
    return `
      <!doctype html>
      <html>
        <body>
          <div id="gitdocs-app"></div>
          ${scripts}
        </body>
      </html>
    `
  }

  const hijacked = hijackConsole()
  const serverEntry = babelRequire('../../themes/server.js')
  const rendered = renderToString(serverEntry.default(route, props))

  hijacked.restore()

  const helmet = Helmet.renderStatic()
  const template = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.base.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.style.toString()}
        ${helmet.script.toString()}

        <style type="text/css">${rendered.css}</style>
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        ${helmet.noscript.toString()}

        <div id="gitdocs-app">${rendered.html}</div>

        <script>window._glamorIds = ${JSON.stringify(rendered.ids)}</script>
        ${scripts}
      </body>
    </html>
  `

  return minify(template, {
    minifyCSS: true,
    collapseWhitespace: true,
    removeComments: true,
  })
}
