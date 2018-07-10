---
description: Generate a minified, production-ready static documentation website.
---
## Production Builds

When you are ready to deploy your site to the internets, you'll want to bundle and minify everything. We do all the dirty work behind the scenes for you, so all you need to do is run a single command.

```bash
$ gitdocs build
```

This will output your site to `.gitdocs_build/`, which can now be deployed to S3, GitHub Pages, Netlify, etc.

#### robots.txt and sitemap.xml

Both of these files are created for you automagically and are available at <a href="/robots.txt" target="_blank">/robots.txt</a> and <a href="/sitemap.xml" target="_blank">/sitemap.xml</a>. You can customize certain in the [config file](/api/config-file).

<div align="right">
  <h3><a href="/static-files">Static Files →</a></h3>
</div>
