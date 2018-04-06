import { minify } from 'html-minifier'

export default async function (data) {
  const {
    helmet,
    rendered,
    bundleFile
  } = data

  return minify(`
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.base.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.style.toString()}
        ${helmet.script.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        ${helmet.noscript.toString()}

        <div id="gitdocs-app">${rendered}</div>
        <script type="text/javascript" src="${bundleFile}"></script>
      </body>
    </html>
  `, {
    collapseWhitespace: true
  })
}
