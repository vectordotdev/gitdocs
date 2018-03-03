module.exports = {
  name: 'GitDocs',
  title: 'GitDocs',
  version: '0.0.1',
  script: 'custom.js',
  css: 'custom.css',
  favicon: 'favicon.ico',
  cover: 'docs-cover.png',
  repository: 'https://github.com/timberio/gitdocs',
  license: 'MIT',
  syntax: {
    languages: ['javascript', 'bash', 'json', 'ocaml'],
    highlighter: 'hljs',
    theme: 'atom-one-light',
  },
  sidebar: {
    defaultDepth: 2,
    position: 'left',
    items: [
      { name: 'Introduction', src: '../README.md' },
      { name: 'Quickstart', src: 'quickstart.md' },
      { name: 'CLI', src: 'command-line-interface.md' },
      {
        name: 'Writing',
        children: [
          { name: 'Markdown', src: 'markdown/markdown.md' },
          { name: 'JSX', src: 'markdown/jsx.md' },
          { name: 'Syntax', src: 'syntax/languages.md' },
          { name: 'Table of contents', src: 'writing/table-of-contents.md' },
        ],
      },
      {
        name: 'Components',
        children: [
          { name: 'Helpers', src: 'components/helpers.md' },
          { name: 'Custom', src: 'components/custom.md' },
          { name: 'Mermaid JS', src: 'components/mermaid.md' },
        ],
      },
      {
        name: 'Configuration',
        children: [
          { name: 'Sidebar', src: 'configuration/sidebar.md' },
          { name: 'Styles', src: 'configuration/styles.md' },
          { name: 'Scripts', src: 'configuration/scripts.md' },
        ],
      },
      {
        name: 'Deploying',
        children: [
          { name: 'Github', src: 'deploying/github.md' },
          { name: 'Gitlab', src: 'deploying/gitlab.md' },
          { name: 'Netlify', src: 'deploying/netlify.md' },
        ],
      },
      { name: 'Development', src: 'development.md' },
    ],
  },
}
