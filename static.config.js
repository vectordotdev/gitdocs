import fs from 'fs-extra'
import path from 'path'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import dirTree from 'directory-tree'
import { getDocPath } from './src/utils'
import defaults from './default.json'

// Get proper docs paths for the current repo
const ROOT = path.resolve(process.env.GITDOCS_CWD || process.cwd())
const DOCS_SRC = path.resolve(ROOT, 'docs')
console.log(ROOT, DOCS_SRC)

// Initialize files and custom config
const files = {}
let custom = {}
let readme = ''

// Case-insensitive check for readme.md
const rootFiles = fs.readdirSync(ROOT)
rootFiles.forEach(item => {
  console.log(item, item.match(/readme.md/i))
  if (item.match(/readme.md/i)) {
    readme = fs.readFileSync(path.resolve(ROOT, item), 'utf8')
  }
})

// Warn if we can't find a readme
if (!readme.length) {
  console.warn('warning: no readme.md found, you may want to add one.')
}

// Grab optional docs.json config and warn if it doesn't exist
try {
  custom = JSON.parse(fs.readFileSync(path.resolve(DOCS_SRC, 'docs.json')))
} catch (e) {
  console.warn('warning: no docs.json found, you may want to add one.')
}

// Merge docs.json config with default config.json
const config = { ...defaults, ...custom }

// Pull out the markdown files in the /docs directory
const tree = dirTree(DOCS_SRC, { extensions: /\.md/ }, item => {
  const contents = fs.readFileSync(item.path, 'utf8')
  files[getDocPath(item.path)] = {
    ...item,
    path: getDocPath(item.path),
    body: contents || '',
  }
})

// Add root readme to file tree
tree.children.unshift({
  path: `${DOCS_SRC}/readme.md`,
  name: 'Introduction',
  type: 'file',
})

files['/readme'] = {
  path: '/readme',
  name: 'Introduction',
  type: 'file',
  body: readme,
}

// Pull out the table of contents from the optional contents.md
const toc = files['/contents']

// Generate docs routes
function makeDocPages (files) {
  return Object.keys(files).map(file => ({
    path: `${files[file].path}`,
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
    toc,
  }),
  getRoutes: () => {
    const docPages = makeDocPages(files)
    return [
      ...docPages,
      {
        path: '/',
        component: 'src/containers/Docs',
        getProps: () => ({ doc: files['/readme'] }),
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
            <link rel="stylesheet" href="https://unpkg.com/nprogress@0.2.0/nprogress.css" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
