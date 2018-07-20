# Front Matter

Every markdown file can include front matter for defining metadata. All front matter is optional, and in most cases, can be defined on a site-wide level by using the [config file](/api/config-file) instead.

You can also define front matter in the `items` array of the parent index page ([see here](/customizing-sidebar)). When using this method, it's important to note that data from the parent item will always take priority over front matter in the file itself.

---

| Key | Type | Default | Description |
| --- | ---- | ------- | ----------- |
| title | string | `[FILENAME]` | The page title to use in the sidebar, as well as the browser tab. |
| description | string | | The description used when generating a [table of contents](/index-files/#table-of-contents). |
| url | string | | Defines a [permalink](https://en.wikipedia.org/wiki/Permalink) for the page. Meaning if you change the location of the file, it will always keep the same URL. |
| draft | boolean | `false` | If a page is in draft mode, it will show up when running locally but will not be included in the production build. |
| hidden | boolean | `false` | If a page is hidden, it will build as normal but not show up in the sidebar. |
| tags | array | `[]` | A comma-seperated list of tags for the page. |
| related | list | `[]` | A list of related docs, must use the relate url. |
| breadcrumbs | boolean | `true` | Whether to display breadcrumb links on the page. |
| table\_of_contents | object | | Follows the same format as the [config file](/api/config-file), but will only toggle the table of contents for the current page. |
| source | string | | See [using sources](/using-sources). |
| source_type | string | `local` | See [using sources](/using-sources). |
| source_root | string | `docs` | See [using sources](/using-sources). |
| source_branch | string | `master` | See [using sources](/using-sources). |
| items | array | | See [customizing sidebar](/customizing-sidebar). Will replace all children items. |
| items_prepend | array | | See [customizing sidebar](/customizing-sidebar). Will merge items to beginning of list. |
| items_append | array | | See [customizing sidebar](/customizing-sidebar). Will merge items to end of list. |
