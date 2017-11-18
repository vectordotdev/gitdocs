import fs from 'fs-extra'
import path from 'path'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import dirTree from 'directory-tree'
import { getDocPath } from './src/utils'

const files = {}
const ROOT = path.resolve(process.env.GITDOCS_CWD || process.cwd())
const DOCS_SRC = path.resolve(ROOT, 'docs')
const config = JSON.parse(fs.readFileSync(path.resolve(DOCS_SRC, 'docs.json')))

const tree = dirTree(DOCS_SRC, { extensions: /\.md/ }, item => {
  const contents = fs.readFileSync(item.path, 'utf8')
  files[getDocPath(item.path)] = {
    ...item,
    body: contents,
  }
})

console.log(files)

function makeDocPages (files) {
  return Object.keys(files).map(file => ({
    path: getDocPath(files[file].path),
    component: 'src/containers/Docs',
    getProps: () => ({
      doc: files[file],
    }),
  }))
}

export default {
  getSiteProps: () => ({
    config,
    files,
    tree,
  }),
  getRoutes: () => {
    const docPages = makeDocPages(files)
    return [
      ...docPages,
      {
        path: '/',
        component: 'src/containers/Docs',
        getProps: () => ({ doc: files['/readme'] })
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
