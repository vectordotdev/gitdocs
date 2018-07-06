const syspath = require('path')
const { minify } = require('html-minifier')
const { renderToString } = require('react-dom/server')
const { extractCritical } = require('emotion-server')
const { Helmet } = require('react-helmet')
const { hijackConsole } = require('../utils/emit')
const babelRequire = require('../utils/babel')

function getScriptTags (entrypoints) {
  const files = entrypoints.main.assets

  return files
    .filter(bundle => syspath.extname(bundle) === '.js')
    .map(bundle => `<script type="text/javascript" src="/${bundle}"></script>`)
    .join('\n')
}

function templateForDevelopment (entrypoints) {
  return `
    <!doctype html>
    <html>
      <body>
        <div id="gitdocs-app"></div>
        ${getScriptTags(entrypoints)}
      </body>
    </html>
  `.trim()
}

function templateForProduction (entrypoints, props, route) {
  process.env.NODE_ENV = 'production'

  const hijacked = hijackConsole()
  const serverEntry = babelRequire('../../themes/server.js')
  const app = serverEntry.default(props, route)
  const rendered = extractCritical(renderToString(app))

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

        <script>window._EMOTION_IDS_ = ${JSON.stringify(rendered.ids)}</script>
        ${getScriptTags(entrypoints)}
      </body>
    </html>
  `

  return minify(template, {
    minifyCSS: true,
    collapseWhitespace: true,
    removeComments: true,
  })
}

module.exports = {
  getScriptTags,
  templateForDevelopment,
  templateForProduction,
}
