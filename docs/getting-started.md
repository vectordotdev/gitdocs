---
description: How to initialize the example files and build your first documentation site.
---
# Getting Started

GitDocs is meant to live unobtrusively alongside your source code. If you don't already have documentation, we will create some example files for you. If you do already have documentation, just point to the correct folder and you will be ready to go! Once you have GitDocs [installed](/installation), you can run these commands:

```bash
# if you don't already have a project folder
$ mkdir my-project && cd my-project
```

```bash
$ gitdocs init

  ❯ What is the name of your project? (my-project) 
  ❯ Do you already have some docs? (y/n) n

  ❯ Created new config file at .gitdocs.json
  ❯ Creating some documentation at docs/
  ❯ Ready to go! Run gitdocs serve to get started
```

These commands will also work in an existing project, just point it to the location of your markdown files when it asks for them. If you don't already have documentation, we will create some example files for you.

## Routing and File Structure

The filesystem will always be the source of truth for routes defined in your site. For example, if you want a page located at `mydocs.com/foo/bar`, your docs will need to have a `docs/foo/bar.md` file. This becomes more apparent when you start using [sources](/using-sources).

---

<div align="right">
  <h3><a href="/running-locally">Running Locally →</a></h3>
</div>
