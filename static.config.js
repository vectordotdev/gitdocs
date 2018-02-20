import fs from 'fs-extra'
import merge from 'lodash.merge'
import path from 'path'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import dirTree from 'directory-tree'
import frontMatter from 'gray-matter'
//
import defaults from './default.json'

// Get proper docs paths for the current repo
const ROOT = path.resolve(process.env.GITDOCS_CWD || process.cwd())
const DOCS_SRC = path.resolve(ROOT, 'docs')

// Initialize files and custom config
const files = []
let tree = {}
let customConfig = {}
let hasReadme

// Case-insensitive check for readme.md
const rootFiles = fs.readdirSync(ROOT)
rootFiles.forEach(item => {
  if (item.match(/README.md/i)) {
    hasReadme = !!fs.readFileSync(path.resolve(ROOT, item), 'utf8')
  }
})

// Warn if we can't find a readme
if (!hasReadme) {
  console.warn('warning: no README.md found, you may want to add one.')
}

// Grab optional docs.json config and warn if it doesn't exist
try {
  customConfig = JSON.parse(fs.readFileSync(path.resolve(DOCS_SRC, 'docs.json')))
} catch (e) {
  console.log(e)
  console.warn('warning: no docs.json found, you may want to add one.')
}

// Merge docs.json config with default config.json
// Dynamic options come from the command line
// and override values in the config file
const dynamicOptions = {}
if (process.env.version) {
  dynamicOptions.version = process.env.version
}
const config = merge(defaults, customConfig, dynamicOptions)

if (config.syntax) {
  process.env.GITDOCS_SYNTAX = JSON.stringify(config.syntax)
}

if (config.sidebar && config.sidebar.items) {
  tree = mapTree(config.sidebar.items, item => ({
    ...item,
    src: path.resolve(DOCS_SRC, item.src),
  }))
} else {
  // Pull out the markdown files in the /docs directory
  tree = dirTree(DOCS_SRC, { extensions: /\.md/ }).children

  // Add root readme to file tree
  tree.unshift({
    name: 'Introduction',
    src: 'README.md',
    order: -Infinity,
  })

  // Filter out public and empty directories
  tree = tree.filter(d => d.name !== 'public')
}

tree = mapTree(tree, (item, i) => {
  const fullFileName = item.src.split('#')[0]
  const fileName = fullFileName.replace('.md', '')
  try {
    const contents = fs.readFileSync(path.resolve(ROOT, fullFileName), 'utf8')
    let name = item.name || `${fileName.substring(0, 1).toUpperCase()}${fileName.substring(1)}`
    let order = 0
    let body = contents

    const editPath = item.src.replace(ROOT, '') // remove filesystem root prefix

    const link = editPath
      .replace('/docs', '') // remove docs prefix
      .replace('.md', '') // remove suffix
      .replace('README', '') // turn root README into index

    const myPath = link.split('#')[0]

    if (!config.sidebar || !config.sidebar.items) {
      const { data, content = '' } = frontMatter(contents)
      name = data.title
      order = typeof data.order !== 'undefined' ? data.order : order
      body = content
    }

    if (fullFileName === path.resolve(ROOT, 'README.md')) {
      body = body
        .split('](/docs/')
        .join('](/')
        .split('](docs/')
        .join('](')
    }

    const newItem = {
      ...item,
      index: i,
      name,
      order,
      link,
      path: myPath,
      editPath,
    }
    files.push({
      ...newItem,
      body,
    })
    return newItem
  } catch (e) {
    console.warn(`warning: could not find file ${fileName}`)
    process.exit(1)
  }
})

export default {
  getSiteData: () => ({
    config,
    tree,
  }),
  getRoutes: () => {
    const routes = [
      // Build the routes
      ...files
        .filter((value, index, self) => self.findIndex(d => d.path === value.path) === index)
        .map(file => ({
          path: file.path,
          component: 'src/containers/Docs',
          getData: () => ({
            doc: file,
          }),
        })),
      {
        is404: true,
        component: 'src/containers/404',
        getData: () => ({
          doc: {
            path: '',
          },
        }),
      },
    ]
    return routes
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  onStart: () => {
    fs.copySync(path.resolve(DOCS_SRC, 'public'), path.resolve(process.cwd(), 'dist'))
  },
  onBuild: () => {
    fs.copySync(path.resolve(DOCS_SRC, 'public'), path.resolve(process.cwd(), 'dist'))
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
            <link rel="stylesheet" href="/custom.css" />
            <title>{config.title}</title>
          </Head>
          <Body>{children}</Body>
          <script src="/custom.js" />
        </Html>
      )
    }
  },
  webpack: (config, { defaultLoaders }) => {
    // We replace the existing JS rule with one, that also transforms from
    // remark-collapse
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            // remark-collapse has ES6 so we need to babel it
            exclude: new RegExp(`${defaultLoaders.jsLoader.exclude}/(?!(remark-collapse)/)`),
            use: [
              {
                loader: 'babel-loader',
              },
            ],
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
    return config
  },
}

function mapTree (item, cb) {
  if (typeof item === 'object' && Array.isArray(item)) {
    return item
      .map(child => mapTree(child, cb))
      .map((child, i) => ({ ...child, index: i }))
      .filter(d => (d.children ? d.children.length : true))
      .sort(
        (a, b) =>
          (a.order > b.order
            ? 1
            : a.order < b.order ? -1 : a.index > b.index ? 1 : a.index < b.index ? -1 : 0),
      )
  }
  if (item.children) {
    item.children = item.children
      .map(child => mapTree(child, cb))
      .map((child, i) => ({ ...child, index: i }))
      .filter(d => (d.children ? d.children.length : true))
      .sort(
        (a, b) =>
          (a.order > b.order
            ? 1
            : a.order < b.order ? -1 : a.index > b.index ? 1 : a.index < b.index ? -1 : 0),
      )
  }
  return cb(item)
}
