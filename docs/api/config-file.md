# Config File

`.gitdocs.json`
`.gitdocs.js`

- name: 'GitDocs'
- root: '.'
- output: '.gitdocs_build'
- static: '.static'
- temp: tempDir()
- baseURL: '/'
- domain: ''
- crawlable: true
- host: 'localhost'
- port: 8000
- languages: ['bash' 'json']
- header_links: []
- theme: 'default'
- breadcrumbs: true
- prefix_titles: false
- table_of_contents
  - page: true
  - folder: true
- syntax
  - theme: 'atom-one-light'
  - renderer: 'hljs'
  - lineNumbers: true
