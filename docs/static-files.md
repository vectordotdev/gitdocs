---
description: How to include and use static files (such as images) in your build.
---
# Static Files

There is a special directory reserved in your root folder for static files: `.static/`. Any files you put in here will be served over the local server or copied over to the output directory when you build your site. For example, a file located at `docs/.static/logo.png` will be available in your documentation site at `/logo.png`. You can change the name of your static folder in the [config file](/api/config-file/#static).

_This folder is relative to your docs folder in your project. If your docs are located at `docs/`, your static folder should be at `docs/.static`._

## Your Site Logo

The logo is a special static asset that gets used in the GitDocs theme (as you can see in the top left of this site.) It will default to the name of your site, but you can specify a [custom logo file](/api/config-file/#logo) in the config. This file should be available in your static folder.

---

<div align="right">
  <h3><a href="/using-sources">Using Sources →</a></h3>
</div>
