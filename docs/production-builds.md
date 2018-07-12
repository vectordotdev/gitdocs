---
description: Generate a minified, production-ready static documentation website.
---
## Production Builds

When you are ready to deploy your site to the internets, you'll want to bundle and minify everything. We do all the dirty work behind the scenes for you, so all you need to do is run a single command:

```bash
$ gitdocs build
```

Once the process completes, you will have a static site located at `.gitdocs_build/`. This is ready to be deployed to S3, GitHub Pages, Netlify, etc.

### robots.txt and sitemap.xml

Both of these files are created for you automagically and are available at <a href="/robots.txt" target="_blank">/robots.txt</a> and <a href="/sitemap.xml" target="_blank">/sitemap.xml</a>. You can change whether or not your robots.txt file allows your site to be crawled by setting `crawlable: false` in the [config file](/api/config-file).

---

<div align="right">
  <h3><a href="/static-files">Static Files →</a></h3>
</div>
