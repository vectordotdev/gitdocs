---
description: How to define external links in the header next to the search bar.
---
# Header Links

There is space on the right side of the search bar for some external links, if you'd rather not put them in the sidebar. These links are easy to define by adding a `header_links` array to the [config file](/api/config-file). You need to include a `title` key, then any other properties you define will get spread onto the `<a>` tag (if you want to open in a new tab, for example.)

```json
{
  "header_links": [
    {
      "title": "GitHub",
      "href": "https://github.com/timberio/gitdocs",
      "target": "_blank"
    }
  ]
}
```

You can define as many links as you'd like here, but be careful that you don't add too many as it will break the design and responsiveness of the site. If you have many external links, only add the best ones to the header and put the rest [in the sidebar](/customizing-sidebar/#external-links).

---

<div align="right">
  <h3><a href="/syntax-highlighting">Syntax Highlighting →</a></h3>
</div>
