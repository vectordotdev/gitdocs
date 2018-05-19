import React from 'react'
import Syntax from 'react-syntax-highlighter/prism-light'
import { theme, languages } from '@codegen/loadSyntax' // eslint-disable-line

export default function (props) {
  let { language } = props
  const { value } = props

  if (language) {
    language = language // language name aliases
      .replace(/^js$/, 'javascript')

    const languageRegistered = languages
      .findIndex(({ name }) => name === language) > -1

    if (!languageRegistered && process.env.NODE_ENV === 'development') {
      console.warn(`You have ${language} syntax in your page, but didn't include it in your config file!`)
    }
  }

  return (
    <Syntax
      style={theme}
      language={language}
      showLineNumbers={props.lineNumbers}
      lineNumberStyle={{ opacity: 0.5 }}
      useInlineStyles
    >
      {value}
    </Syntax>
  )
}
