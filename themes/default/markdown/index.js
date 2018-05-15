import React from 'react'
import Markdown from 'markdown-to-jsx'
import Syntax, { registerLanguage } from 'react-syntax-highlighter/prism-light'
import { theme, languages } from '@codegen/loadSyntax' // eslint-disable-line
import { Wrapper } from './styles'

const CODE_BLOCK_FENCED = /^\s*(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n *)+\n/
const CODE_BLOCK = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n/

const Code = (props) => {
  const {
    className = '',
    children,
  } = props

  if (
    !props.source.match(CODE_BLOCK_FENCED) &&
    !props.source.match(CODE_BLOCK)
  ) {
    return <code>{children}</code>
  }

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
      lineNumberStyle={{ opacity: 0.5 }}
      useInlineStyles
    >
      {children}
    </Syntax>
  )
}

export default function (props) {
  languages.forEach(lang =>
    registerLanguage(lang.name, lang.func))

  const options = {
    overrides: {
      code: {
        props,
        component: Code,
      },
    },
  }

  return (
    <Wrapper>
      <Markdown options={options}>
        {props.source}
      </Markdown>
    </Wrapper>
  )
}
