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

  const {
    rendered,
    helmetData,
    styleTags,
  } = serverRender(route, props)

  const template = `
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
