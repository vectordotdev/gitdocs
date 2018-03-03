module.exports = {
  name: 'GitDocs',
  version: '0.0.1',
  script: 'custom.js',
  css: 'custom.css',
  favicon: 'favicon.ico',
  cover: 'cover.png',
  repository: 'https://github.com/react-tools/gitdocs',
  license: 'MIT',
  root: './docs',
  logo: './logo.png',
  syntax: {
    showLineNumbers: false,
    highlighter: 'hljs',
    theme: 'atom-one-dark',
  },
  sidebar: {
    defaultDepth: 3,
    position: 'left',
  },
}
