import React from 'react'
import Markdown from 'markdown-to-jsx'
import Syntax, { registerLanguage } from 'react-syntax-highlighter/prism-light'
// import { theme, languages } from '@temp/loadSyntax' // eslint-disable-line

const Code = (props) => {
  const {
    className = '',
    children,
  } = props

  const language = className.split('-')[1]

  if (language) {
    const languageRegistered = languages
      .findIndex(i => i.name === language) > -1

    if (!languageRegistered && process.env.NODE_ENV === 'development') {
      console.warn(`You have ${language} syntax in your page, but didn't include it in your config file!`)
    }
  }

  return (
    <Syntax
      style={theme}
      language={language}
      showLineNumbers={props.lineNumbers}
    >
      {children}
    </Syntax>
  )
}

export default function (props) {
  // languages.forEach(lang =>
  //   registerLanguage(lang.name, lang.func))

  const options = {
    overrides: {
      // code: {
      //   props,
      //   component: Code,
      // },
    },
  }

  return (
    <Markdown options={options}>
      {props.source}
    </Markdown>
  )
}
