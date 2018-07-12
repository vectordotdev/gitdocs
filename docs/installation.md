---
description: Installing GitDocs onto your machine is a simple process using NPM.
---
# Installation

We currently publish GitDocs as an NPM package. After [installing Node and NPM](https://www.npmjs.com/get-npm) (we require Node v8.9 or greater), run the following to install the GitDocs beta as a global:

```bash
$ npm install -g gitdocs@next
```

You can now use the `gitdocs` command in your terminal. Running without any commands will show the following help menu:

```
  Usage

    gitdocs <command> [options]

    for further info about a command:
    gitdocs <command> --help or gitdocs help <command>

  Commands

    init .................... initialize a new project
    serve ................... runs the local development server
    build ................... creates a static production bundle
    help .................... show the help menu for a command

  Options

    --config, -c ............ customize the config file location
    --help, -h .............. display the usage menu for a command
    --version, -v ........... show the version number
```

---

<div align="right">
  <h3><a href="/getting-started">Getting Started →</a></h3>
</div>
