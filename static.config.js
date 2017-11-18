import fs from 'fs-extra'
import path from 'path'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import dirTree from 'directory-tree'

let files = {}
const ROOT =  path.resolve(process.env.GITDOCS_CWD)
const DOCS_SRC = path.resolve(ROOT, 'docs')
const DIST = path.resolve(ROOT, 'docsDist')

const tree = dirTree(DOCS_SRC, { extensions:/\.md/ }, (item, nodePath) => {
  const contents = fs.readFileSync(item.path, 'utf8')
  files[item.path] = contents
})

const config = {
  title: 'Documentation'
} // pull from ./docs/config.json
// console.log(tree)

export default {
  getSiteProps: () => ({
    title: config.title,
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/containers/Docs',
         getProps: () => ({
          tree,
          files,
          config,
        }),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
