import React from 'react'
import Markdown from 'markdown-to-jsx'
// import Syntax, { registerLanguage } from 'react-syntax-highlighter/light'
// import docco from 'react-syntax-highlighter/styles/hljs/docco'

// import { Markdown, loadLanguages } from 'react-smackdown'
// import jsx from 'reprism/languages/jsx'

// Import any Prism-compatible theme. We even have our own "smackdown" themes!
// import 'react-smackdown/themes/smackdown-light.css'

// Load the languages into smackdown (via RePrism)
// loadLanguages(jsx)

// const mods = [
//   `react-syntax-highlighter/languages/hljs/javascript.js`,
//   `react-syntax-highlighter/languages/hljs/json.js`,
// ].map(i => require(i))

// const Code = (props) => {
//   const {
//     className = '',
//     children,
//   } = props

//   const lang = className.split('-')[1]

//   return lang
//     ? <Syntax language={lang} style={docco}>{children}</Syntax>
//     : <code>{children}</code>
// }

export default function (props) {
  // console.log(mods)
  // props.languages.forEach(lang => {
  //   try {
  //     const module = require(`react-syntax-highlighter/languages/hljs/${lang}.js`)
  //     registerLanguage(lang, module.default)
  //   } catch (err) {
  //     console.log(err)
  //     console.log(`Could not find language: ${lang}`)
  //   }
  // })

  const options = {
    overrides: {
      // code: Code,
    },
  }

  return (
    <Markdown options={options}>
      {props.source}
    </Markdown>
  )
}
