import syspath from 'path'
import { minify } from 'html-minifier'
import serverRender from '../themes/server'

export default async function (env, route, props, bundleFiles) {
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

  const rendered = serverRender(route, props)
  const template = `
    <!doctype html>
    <html ${rendered.helmetData.htmlAttributes.toString()}>
      <head>
        ${rendered.helmetData.title.toString()}
        ${rendered.helmetData.base.toString()}
        ${rendered.helmetData.meta.toString()}
        ${rendered.helmetData.link.toString()}
        ${rendered.helmetData.style.toString()}
        ${rendered.helmetData.script.toString()}

        <style type="text/css">${rendered.css}</style>
      </head>
      <body ${rendered.helmetData.bodyAttributes.toString()}>
        ${rendered.helmetData.noscript.toString()}

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
