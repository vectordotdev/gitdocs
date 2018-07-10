---
description: Configuring custom syntax highlighting to suit your needs.
---
# Syntax Highlighting

GitDocs supports syntax highlighting for 176 different languages out of the box. The only thing you need to do is specify which languages you're using in the config file (since it would generate large bundle files if we included everything!) It has `bash` and `json` enabled by default, since those are the most common languages used in readme's. [Read more here](/api/config-file/#syntax-highlighting) for details on how to enable other languages.

## Choosing a Renderer

Both [HighlightJS](https://highlightjs.org) and [PrismJS](https://prismjs.com) are supported since language support is slightly different between the two (mainly PrismJS supports JSX while HighlightJS does not.) We default to HighlightJS, but you can enable PrismJS by [changing the renderer](/api/config-file/#syntax-highlighting) in the config file.

## Choosing a Style

You can use any syntax style/theme supported by the renderer you are using.

* [HighlightJS Styles](https://github.com/isagalaev/highlight.js/tree/master/src/styles)
* [PrismJS Styles](https://github.com/PrismJS/prism-themes)

## Line Numbers

Line numbers for all syntax blocks are enabled by default. They can be disabled in the [config file](/api/config-file/#syntax-highlighting).

<div align="right">
  <h3><a href="/theming">Theming →</a></h3>
</div>
