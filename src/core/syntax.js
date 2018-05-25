const fs = require('fs-extra')
const syspath = require('path')
const { log } = require('../utils/emit')
const { namespaces } = require('../utils/temp')

module.exports = async (config) => {
  const {
    temp,
    languages,
    syntax,
  } = config

  const rsh = syspath.dirname(require.resolve('react-syntax-highlighter'))
  const langs = languages
    .filter(lang => fs.pathExistsSync(`${rsh}/languages/${syntax.renderer}/${lang}.js`))
    .map(lang => `{ name: '${lang}', func: require('${rsh}/languages/${syntax.renderer}/${lang}').default },`)
    .join('\n')

  const content = `module.exports = {
    theme: require('${rsh}/styles/${syntax.renderer}/${syntax.theme}').default,
    languages: [${langs}]
  }`

  const path = `${temp}/${namespaces.codegen}/loadSyntax.js`
  await fs.outputFile(path, content)
  log('[\u2713] Syntax loaded')
  return path
}
