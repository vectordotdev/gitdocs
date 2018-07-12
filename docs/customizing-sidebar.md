---
description: How to customize the link order and titles of items in the sidebar.
---
# Customizing the Sidebar

At times you may want to customize how the sidebar looks and add additional items to it--whether it's external links, dividers or changing the link order. This can all be done in the front matter of an [index file](/index-files), using the `items` key which is a list of the current item's children.

```yaml
---
items:
  - path: foo.md
  - path: bar.md
  - path: baz.md

# or shorthand
items:
  - foo.md
  - bar.md
  - baz.md
---
```

It's important to note that defining `items` will overwrite the default children. If you don't manually list all of your files, they will not be included. This can be useful if you want to manually exclude some pages, but may be cumbersome if you have many files.

If you only want to change _a few_ pages and avoid redefining the entire file tree, you can use `items_prepend` or `items_append`. These follow the same structure as `items` but instead of replacing the children, GitDocs will merge the items at the beginning or end of the list.

### No Index? No Problem.

How can you do any of this if there is no index file in a folder? Easy enough. You can nest the `items` key as deeply as you'd like. So if a folder doesn't have an index file, you can define the order in the nearest index file like so:

```yaml
items:
  - foo.md
  - path: bar
    items:
      - qux.md
      - baz.md
```

### Defining front matter for children

You can define any valid [front matter value](/api/front-matter) in the item, just as you would in the file itself. GitDocs will automatically merge a file's front matter with data from the parent (which will take priority.) For example, if you want to change the title of a page, these two options will produce the same result:

```yaml
# foo/bar.md
---
title: BAR
---
```

```yaml
# foo/index.md
---
items:
  - path: bar.md
    title: BAR
---
```

## Changing the Order

Following the structure explained above, changing the order of sidebar links is as simple defining `items`/`items_prepend`/`items_append` and listing the children in the order you'd like. GitDocs will always respect the order of your list.

## External Links

You can specify an external link by using `url` instead of `path`. These look the same as regular links in the sidebar, but will have an icon next to them and open in a new tab.

```yaml
---
items:
  - url: https://github.com/timberio/gitdocs
    title: GitHub Repo
---
```

## Components

You can specify a component in place of a link by using `component` instead of `path`. This can be useful to visually seperate items in your sidebar.

```yaml
---
items:
  - foo.md
  - component: Divider
  - bar.md
---
```

Available components:

* `Divider`

## Hidden Pages

If a page is not ready to be published or you simply want to omit the link from the sidebar, you have a few options:

* `draft: true` in the front matter will include the page normally when you run the [local server](/running-locally), but _not_ when you [build for production](/production-builds).
* `hidden: true` in the front matter will include the page in production and the URL will be publicly accessible, but there will be no link in the sidebar.
* Define `items` in the front matter and intentionally leave out your hidden pages.

---

<div align="right">
  <h3><a href="/header-links">Header Links →</a></h3>
</div>
