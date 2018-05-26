import React from 'react'
import Highlight from 'react-syntax-highlighter/light'
import Prism from 'react-syntax-highlighter/prism-light'
import { theme, languages } from '@codegen/loadSyntax' // eslint-disable-line

export default function (props) {
  let { language } = props
  const { value, renderer } = props

  if (language) {
    language = language // language name aliases
      .replace(/^js$/, 'javascript')

    const languageRegistered = languages
      .findIndex(({ name }) => name === language) > -1

    if (!languageRegistered && process.env.NODE_ENV === 'development') {
      console.warn(`You have ${language} syntax in your page, but didn't include it in your config file!`)
    }
  }

  const Syntax = renderer === 'prism'
    ? Prism
    : Highlight

  return (
    <Syntax
      style={theme}
      language={language}
      showLineNumbers={props.lineNumbers}
      lineNumberStyle={{ opacity: 0.3 }}
      useInlineStyles
    >
      {value}
    </Syntax>
  )
}
