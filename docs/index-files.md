---
description: The how and when of utilizing index files in your docs site.
---
# Index Files

Every folder can have an index file that will show when the top-level link is clicked. GitDocs will look for a valid index filename in each folder. If one doesn't exist, clicking the top-level link in the sidebar will simply expand the list without navigating to a new route (see the API section of this site, it doesn't have an index.)

Index files are totally optional with the exception of a root index.

## Root Index

Every website needs a home page. GitDocs requires at least one index file at the root of your documentation to use as the home page. If you are unsure what to put here, a simple title and description will be sufficient. We will add a table of contents to the bottom of the page, which should fill up the rest of the space nicely.

## Valid Index Filenames

* `index.md`
* `readme.md`

Index filenames are case insensitive, so using `README.md` will still work.

## Table of Contents

If you have an index file in a folder, a table of contents will automatically be generated and appended to the content using the `title` and `description` of each item. This can be disabled for the entire site in the [config file](/api/config-file), or for individual folders in the [front matter](/api/front-matter) of the index file.

_Note: An item will not show up in the folder's table of contents if it's a folder without an index._

---

<div align="right">
  <h3><a href="/customizing-sidebar">Customizing Sidebar →</a></h3>
</div>
