---
description: Get a live preview of changes you make by running the local server.
---
# Running Locally

To get a live preview of your docs as you write them, you can run our local development server. While in the root directory of your project (where the `.gitdocs.json` lives), simply run this:

```bash
$ gitdocs serve
```

You can now access your documentation at <a href="http://localhost:8000" target="_blank">http://localhost:8000</a>. How nice is that? Try changing some text in one of the markdown files and watch it instantly live reload in your browser.

## Live Reloading

When editing your docs, the pages will automatically live reload in your browser when you hit save. Usually faster than it takes for you to swich windows. This provides a seamless way to view your rendered markdown without the hassle of using a markdown editor.

_Note: Live reload is currently limited to the markdown content itself. Any changes to the file structures, front matter or config file require the server to be restarted. [This is an open issue.](https://github.com/timberio/gitdocs/issues/139)_

---

<div align="right">
  <h3><a href="/production-builds">Production Builds →</a></h3>
</div>
