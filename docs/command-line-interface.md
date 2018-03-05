# Command Line Interface (CLI)

The GitDocs CLI is used to initial, build, serve, and deploy your documentation

## Initialization

`gitdocs init`

This command initializes a new project with everything you need to get started.

<Tip>We recommend starting a project like this if you've never used GitDocs before.</Tip>

## Build

`gitdocs build [output] [doc-version]`

The build command builds your documentation for release. The command takes two (2) optional positional arguments.

| Argument | Optional? | Default | Use |
| -------- | --------- | ------- | --- |
| output | Yes | `'docs-dist'` | Specifies the output directory for the build. |
| doc-version | Yes | '' | If specified, overrides the `'version'` property in the config. |

## Serve

`gitdocs serve [path]`

The serve command lets you preview your documentation locally. The command takes a single optional positional argument. If this argument is not specified, the `react-static` dev server is used to display the documentation. This

| Argument | Optional? | Default | Use |
| -------- | --------- | ------- | --- |
| path | Yes | -- | Directory to serve. |


Additionally, the following flags may be used:

| Flag | Alias | Use |
| ---- | ----- | --- |
| `--port` | `-P` | When serving a path, use this port. Not used is the `path` option is not specified.

<Danger>The serve command should not be used for hosting production documentation.</Danger>

## Deploy

`gitdocs deploy [location]`

The deploy command will build your documentation and deploy it to a location of your choosing. The location is specified using a position argument. Currently the following values are supported

* ['gh-pages'](/deploying/github)
