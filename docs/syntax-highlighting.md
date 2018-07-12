---
description: Configuring custom syntax highlighting to suit your needs.
---
# Syntax Highlighting

GitDocs supports syntax highlighting for 176 different languages out of the box. The only thing you need to do is specify which languages you're using in the config file (since it would generate large bundle files if we included everything!) `bash` and `json` are enabled by default, but it's easy to enable other languages [in the config file](/api/config-file).

## Setting a Language

To set the language for a code block, add the language name after the triple backticks like this:

```
```javascript
console.log("Hello World!")
```
```

## Choosing a Renderer

Both [HighlightJS](https://highlightjs.org) and [PrismJS](https://prismjs.com) are supported, since language support is slightly different between them (mainly PrismJS supports JSX while HighlightJS does not.) GitDocs defaults to HighlightJS, but you can enable PrismJS by [changing the renderer](/api/config-file/#syntax-renderer) in the config file.

You can also use any syntax style/theme supported by the renderer you are using.

* [HighlightJS Styles](https://github.com/isagalaev/highlight.js/tree/master/src/styles)
* [PrismJS Styles](https://github.com/PrismJS/prism-themes)

## Line Numbers

Line numbers for all syntax blocks are enabled by default. They can be disabled in the [config file](/api/config-file/#syntax-lineNumbers).

---

<div align="right">
  <h3><a href="/theming">Theming →</a></h3>
</div>
