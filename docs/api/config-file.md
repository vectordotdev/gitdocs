# Config File

A config file is generated when you run [`gitdocs init`](/api/commands), but it can also be created manually. It can be a JSON file or a Javascript file. Valid filenames are `.gitdocs.json` or `.gitdocs.js`.

### Using a Javascript file

If you are using `.gitdocs.js` as your config file, you will need to export an object or a promise that resolves with an object.

```javascript
module.exports = new Promise((resolve, reject) => {
  resolve({
    name: 'GitDocs',
    root: 'docs',
  })
})
```

---

| Key | Type | Default | Description |
| --- | ---- | ------- | ----------- |
| name | string | | The name of your documentation site. _Used as the logo when no file is specified._ |
| root | string | `.` | The root directory for your documentation. |
| output | string | `.gitdocs_build` | The directory where the static site is outputted to. |
| static | string | `.static` | The directory to use for static assets. |
| temp | string | `[SYSTEM]` | The directory to use for temporary files. |
| logo | string | | The location of a logo image file, relative to the [static directory](/static-files). |
| baseURL | string | `/` | The base URL to use when generating the routes. |
| domain | string | | The domain name that gets prepended to URLs in the sitemap. |
| crawlable | boolean | `true` | Whether your site should be crawlable by search engines. |
| host | string | `localhost` | The hostname to use for the local server. |
| port | number | `8000` | The port to use for the local server. |
| languages | array | `['bash', 'json']` | The languages to include for [syntax highlighting](/syntax-highlighting). |
| header_links | array | `[]` | External links to include in the header. See [header links](/header-links) for more details. |
| theme | string | `default` | The name of the theme to use. There is only one theme at the moment. |
| breadcrumbs | boolean | `true` | Whether to enable breadcrumb links on each page. This can also be disabled [in the front matter](/api/front-matter). |
| prefix_titles | boolean | `false` | If enabled, will automatically generate an `h1` tag on each page. |
| table\_of_contents | object | | |
| table\_of_contents.page | boolean | `true` | Whether to enable the table of contents for headers in the page. |
| table\_of_contents.folder | boolean | `true` | Whether to enable the table of contents for pages in a folder (shown in the [index page](/index-files).) |
| syntax | object | | |
| syntax.theme | string | `atom-one-light` | The [syntax highlighting theme](/syntax-highlighting/#choosing-a-style) to use. |
| syntax.renderer | string | `hljs` | The [syntax highlighting renderer](/syntax-highlighting/#choosing-a-renderer) to use. Options are `hljs` or `prism`. |
| syntax.lineNumbers | boolean | `true` | Whether to show line numbers in code blocks. |
