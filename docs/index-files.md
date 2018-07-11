---
description: The how and when of utilizing index files in your docs site.
---
# Index Files

Every folder can have an index file that will show when the top-level link is clicked. GitDocs will look for a [valid index filename](#valid-index-filenames) in each folder. If one doesn't exist, clicking the top-level link in the sidebar will simply expand the list without navigating to a new route. Index files are totally optional with the exception of a root index.

## Root Index

Every website needs a home page. What would your documentation site be without one? Because of this, GitDocs requires at least one index file at the root of your documentation to use as the home page.

## Valid Index Filenames

* `index.md`
* `readme.md`

Index filenames are case insensitive, so using `README.md` will still work.

## Table of Contents

If you have an index file in a folder, a table of contents will automatically be generated and appended to the content--displaying a link with the `title` and `description` for each item. This can be disabled for the entire site in the [config file](/api/config-file), or for individual folders in the [front matter](/api/front-matter) of the index file.

---

<div align="right">
  <h3><a href="/customizing-sidebar">Customizing Sidebar →</a></h3>
</div>
