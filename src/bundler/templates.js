import fs from 'fs-extra'
import { minify } from 'html-minifier'
import { generateTree, renderTree } from './routing'

function _html (data) {
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

export default async function (root, output) {
  await fs.emptyDir(output)
  const tree = await generateTree(root, output)

  await Promise.all(
    tree.map(async route => {
      console.log(`processing ${route.path}`)

      await fs.outputFile(route.output, _html({
        ...await renderTree(tree, route.path),
        bundleFile: 'bundle.js'
      }))
    })
  )
}
