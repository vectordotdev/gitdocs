# Development
Issues and feature requests are tracked on [Github Issues](https://github.com/timberio/gitdocs/issues). Before filing an issue please check the open issues to see if your request has been reported already.

When filing issues, having a simple reproduce is appreciated. Hosting a test case using [JSFiddle](https://jsfiddle.net), or another similar tool, simplifies the reproduce steps.

## Local Builds

You can build the documentation locally by running:

```bash
npm run build
```

or with Yarn

```bash
yarn build
```

This will create a `/dist/` folder which can be served locally on port 3000 by running:

```bash
yarn serve
```