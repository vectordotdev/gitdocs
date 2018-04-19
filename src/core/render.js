import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import helmet from 'react-helmet'
import { minify } from 'html-minifier'

async function _template (rendered) {
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

export default async function (template, route, extraProps = {}) {
  const module = require(`../templates/${template}`)
  const Application = module.default || module

  const rendered = renderToString(
    <StaticRouter
      context={route}
      location={route.path}
    >
      <Application
        route={route}
        {...extraProps}
      />
    </StaticRouter>
  )

  return _template(rendered)
}
