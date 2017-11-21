# GitDocs

Easy to use, beautiful documentation that lives in your git repo.

## How does it work

`gitdocs` is distributed as a cli package on npm. You can simply install it with `npm install gitdocs -g` and run `gitdocs serve` to preview your docs or `gitdocs build` to generate a static site wherever you like.

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

Assuming you have a folder with markdown files at `/docs`, you can automatically preview your docs site by running.

```bash
gitdocs serve
```

- The `readme.md` in your repo will be used as the default homepage for your docs
- `docs.json` allows you to specify your project settings like the version, name and much more
- The navigation will automatically be built using your docs folder structure, but you can add an optional `contents.md` file to generate your own navigation. See [configuration/sidebar](/configuration/sidebar.md) or more info.

<p class="tip">
  You don't really need <code>docute-cli</code>, it's just a tool for scaffolding out a doc folder and bringing you a dev-server with live reloading support. You can use any similar tool, for example, <a href="https://github.com/tapio/live-server" target="_blank">live-server</a> + <a href="http://yeoman.io/" target="_blank">yeoman generator</a>, or simply crafted by hand if you like, there's not much work you have to do!
</p>
