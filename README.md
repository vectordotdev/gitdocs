---
layout: post
title: Blogging Like a Hacker
---

# GitDocs

Easy to use, SEO-friendly, beautiful documentation that lives in your git repo.

## How does it work?

It turns markdown files in your `/docs` folder (or wherever you choose) into rich, interactive documentation. Out of the box you get helpers like [syntax highlighting](syntax/languages) using [Prism](prismjs.com) or [Highlight.js](https://highlightjs.org/), callouts like [Tip](writing/helpers#tip), <Highlight>highlight</Highlight> and much more. You can even extend GitDocs to support custom components using libraries like React and Vue.

`gitdocs` is distributed as a package on npm. It is a cli that you can simply install with `npm install gitdocs -g`. You can run `gitdocs serve` to preview your docs or `gitdocs build` to generate a static site wherever you like.

## Installation

Using npm:

```bash
npm i -g gitdocs
```

Using Yarn:

```bash
yarn global add gitdocs
```

## Quick Start

You can create an initialize a new project using the following command. You will be prompted to name the project and provide a link to the repository URL.

```bash
gitdocs init
```

Assuming you have a folder with markdown files at `/docs`, you can automatically preview your docs site by running:

```bash
gitdocs serve
```

and build your site to any destination with:

```bash
gitdocs build --output="docs-dist"
```

- The `readme.md` in your repo will be used as the default homepage for your docs
- `docs/docs.json` allows you to specify your project settings like the version, name and much more
- The navigation will automatically be built using your docs folder structure, but you can override this in `docs.json` to generate your own navigation. See [configuration/sidebar](/configuration/sidebar.md) for more info.
