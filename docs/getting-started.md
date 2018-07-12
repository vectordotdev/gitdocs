---
description: How to initialize the example files and build your first documentation site.
---
# Getting Started

GitDocs is meant to live unobtrusively alongside your source code. If you don't already have documentation, we will create some example files for you. If you do already have documentation, just point to the correct folder when asked and you will be ready to go! Once you have GitDocs [installed](/installation), run these commands:

```bash
$ mkdir my-project # if you're starting fresh with a new project
$ cd my-project
```

```bash
$ gitdocs init

  ❯ What is the name of your project? (my-project) 
  ❯ Do you already have some docs? (y/n) n

  ❯ Created new config file at .gitdocs.json
  ❯ Creating some documentation at docs/
  ❯ Ready to go! Run gitdocs serve to get started
```

## Routing and File Structure

The filesystem will always be the source of truth for routes defined in your site. For example, if you want a page located at `mydocs.com/foo/bar`, your docs will need to have a `docs/foo/bar.md` file. This becomes more apparent when you start using [sources](/using-sources). The only exception to this is if you define `url` in the [front matter](/api/front-matter), which will create a permalink.

---

<div align="right">
  <h3><a href="/running-locally">Running Locally →</a></h3>
</div>
