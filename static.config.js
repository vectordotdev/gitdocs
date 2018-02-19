import fs from 'fs-extra'
import merge from 'lodash.merge'
import path from 'path'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import dirTree from 'directory-tree'
import frontMatter from 'gray-matter'
//
import { getDocPath } from './src/utils'
import defaults from './default.json'

// Get proper docs paths for the current repo
const ROOT = path.resolve(process.env.GITDOCS_CWD || process.cwd())
const DOCS_SRC = path.resolve(ROOT, 'docs')

// Initialize files and custom config
const files = []
let tree = {}
let customConfig = {}
let readmeContent

// Case-insensitive check for readme.md
const rootFiles = fs.readdirSync(ROOT)
rootFiles.forEach(item => {
  if (item.match(/README.md/i)) {
    readmeContent = fs.readFileSync(path.resolve(ROOT, item), 'utf8')
  }
})

// Warn if we can't find a readme
if (!readmeContent) {
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

if (config.theme) {
  if (config.highlighter === 'prism') {
    config.theme = require(`react-syntax-highlighter/styles/prism/${config.theme}`).default // eslint-disable-line
  } else {
    config.theme = require(`react-syntax-highlighter/styles/hljs/${config.theme}`).default // eslint-disable-line
  }
}

if (config.sidebar && config.sidebar.items) {
  tree = buildTree(config.sidebar.items, '', '')
} else {
  // Pull out the markdown files in the /docs directory
  tree = dirTree(DOCS_SRC, { extensions: /\.md/ }).children

  // Add root readme to file tree
  tree.unshift({
    path: `${ROOT}/README.md`,
    name: 'Introduction',
    type: 'file',
    order: -Infinity,
  })

  // Filter out public and empty directories
  tree = tree.filter(
    d => d.name !== 'public' && (d.type === 'directory' ? d.children.length > 0 : true),
  )

  tree = mapTree(tree, item => {
    const contents = fs.readFileSync(item.path, 'utf8')
    const { data: { title, order = 0 }, content: body = '' } = frontMatter(contents)
    const newItem = {
      ...item,
      name: title || `${item.name.substring(0, 1).toUpperCase()}${item.name.substring(1)}`,
      path: getDocPath(item.path),
      order: typeof item.order !== 'undefined' ? item.order : order,
    }
    files.push({
      ...newItem,
      body,
    })
    return newItem
  })
}

export default {
  getSiteData: () => ({
    config,
    tree,
  }),
  getRoutes: () => [
    // Build the routes
    ...Object.keys(files)
      .map(key => files[key])
      .map(file => ({
        path: `/${file.path}`,
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
  ],
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

function buildTree (item, name, current) {
  // Is this a directory?
  const isDir = typeof item === 'object'
  const isReadme = !isDir && item.match(/readme.md/i) && item.indexOf('/') === -1

  // Build the doc
  const child = {
    name,
    path: isDir ? current : getDocPath(item),
    file: isDir ? null : isReadme ? item : `docs/${item}`,
    type: isDir ? 'directory' : 'file',
    body: isDir ? '' : importFile(item),
  }

  // If we're referencing the root readme, make it work
  if (!isDir && isReadme) {
    child.body = readmeContent
  }

  // Add to file list for convenience
  if (!isDir) {
    files[getDocPath(item)] = child
  }

  if (isDir) {
    child.children = Object.keys(item).map(k => buildTree(item[k], k, `${current}/${k}`))
  }

  return current ? child : child.children
}

function mapTree (item, cb) {
  if (typeof item === 'object' && Array.isArray(item)) {
    return item
      .map(child => mapTree(child, cb))
      .sort((a, b) => (a.order > b.order ? 1 : a.order < b.order ? -1 : 0))
  }
  if (item.children) {
    item.children = item.children
      .map(child => mapTree(child, cb))
      .sort((a, b) => (a.order > b.order ? 1 : a.order < b.order ? -1 : 0))
    return item
  }
  return cb(item)
}

function importFile (pathToFile) {
  try {
    return fs.readFileSync(path.resolve(DOCS_SRC, pathToFile), 'utf8')
  } catch (e) {
    console.warn(`warning: could not find file ${pathToFile}`)
    return ''
  }
}
