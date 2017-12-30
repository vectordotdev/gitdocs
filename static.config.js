import fs from 'fs-extra'
import merge from 'lodash.merge'
import path from 'path'
import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import dirTree from 'directory-tree'
import { getDocPath } from './src/utils'
import defaults from './default.json'

// Get proper docs paths for the current repo
const ROOT = path.resolve(process.env.GITDOCS_CWD || process.cwd())
const DOCS_SRC = path.resolve(ROOT, 'docs')

// Initialize files and custom config
const files = {}
let tree = {}
let custom = {}
let readme = ''

// Case-insensitive check for readme.md
const rootFiles = fs.readdirSync(ROOT)
rootFiles.forEach(item => {
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
const config = merge(defaults, custom, dynamicOptions)

if (config.theme) {
  if (config.highlighter === 'prism') {
    config.theme = require(`react-syntax-highlighter/styles/prism/${config.theme}`).default
  } else {
    config.theme = require(`react-syntax-highlighter/styles/hljs/${config.theme}`).default
  }
}

if (!config.sidebar || !config.sidebar.items) {
  // Pull out the markdown files in the /docs directory
  tree = dirTree(DOCS_SRC, { extensions: /\.md/ }, item => {
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

  // Add readme to file list
  files.readme = {
    path: 'readme',
    name: 'Introduction',
    type: 'file',
    body: readme,
  }
}

function importFile (pathToFile) {
  try {
    return fs.readFileSync(path.resolve(DOCS_SRC, pathToFile), 'utf8')
  } catch (e) {
    console.warn(`warning: could not find file ${pathToFile}`)
    return ''
  }
}

function buildTree (item, name, current) {
  // Is this a directory?
  const isDir = typeof item === 'object'
  const isReadme = !isDir && item.match(/readme.md/i) && item.indexOf('/') === -1

  // Build the doc
  const child = {
    name,
    path: isDir ? current : getDocPath(item),
    file: isDir
      ? null
      : isReadme ? item : `docs/${item}`,
    type: isDir ? 'directory' : 'file',
    body: isDir ? '' : importFile(item),
  }

  // If we're referencing the root readme, make it work
  if (!isDir && isReadme) {
    child.body = readme
  }

  // Add to file list for convenience
  if (!isDir) {
    files[getDocPath(item)] = child
  }

  if (isDir) {
    child.children = Object.keys(item)
      .map(k => buildTree(item[k], k, `${current}/${k}`))
  }

  return child
}

if (config.sidebar && config.sidebar.items) {
  tree = buildTree(config.sidebar.items, '', '')
}

// Generate docs routes
function makeDocPages (files) {
  return Object.keys(files).map(file => ({
    path: `/${files[file].path}`,
    component: 'src/containers/Docs',
    getProps: () => ({
      doc: files[file],
    }),
  }))
}

export default {
  siteRoot: '/',
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
        getProps: () => ({
          doc: config.sidebar
            ? files[Object.keys(files)[0]]
            : files.readme,
        }),
      },
      {
        is404: true,
        component: 'src/containers/404',
        getProps: () => ({
          doc: {
            path: '',
          },
        }),
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  onStart: () => {
    fs.copySync(
      path.resolve(DOCS_SRC, 'public'),
      path.resolve(process.cwd(), 'dist'),
    )
  },
  onBuild: () => {
    fs.copySync(
      path.resolve(DOCS_SRC, 'public'),
      path.resolve(process.cwd(), 'dist'),
    )
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
    config.module.rules = [{
      oneOf: [
        {
          test: /\.(js|jsx)$/,
          // remark-collapse has ES6 so we need to babel it
          exclude: new RegExp(`${defaultLoaders.jsLoader.exclude}/(?!(remark-collapse)\/)`),
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        defaultLoaders.cssLoader,
        defaultLoaders.fileLoader,
      ],
    }]
    return config
  }
}
