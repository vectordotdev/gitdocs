---
title: JSON Data
description: Query the raw JSON data for your documentation to use in other apps.
---
# JSON Data

It can often be useful to have access to your raw documentation data for the purpose of searching, embedding, etc. This feature comes out of the box with GitDocs as raw JSON files for each page. When you build your site, a JSON file is generated alongside each HTML file containing the meta data and page contents, along with an overall database file for the site.

### index.json

When your site is built, you get an `index.html` and `index.json` for every page. The HTML file is used by web browsers when you go to a URL (e.g. `mydocs.com/foo/bar/` will use `/foo/bar/index.html`), but you can also make a request to `mydocs.com/foo/bar/index.json` for the raw data.

_Note: These files will only exist when you [build for production](/production-builds), not when running the local server._

### db.json

Your build will also include a main database file, containing content for your entire site as well as breadcrumbs, tags, etc. This is how the GitDocs search works--by making a network request for this file and statically searching titles and content.

This file is basically a concatenation of all the `index.json` files, and can be found at the root of your site.
