import React from 'react'
import Markdown from 'react-markdown'
import { registerLanguage } from 'react-syntax-highlighter/prism-light'
import { languages } from '@codegen/loadSyntax' // eslint-disable-line
import { Wrapper } from './styles'
import Code from './overrides/Code'
import Header from './overrides/Header'
import Link from './overrides/Link'

export default function (props) {
  languages.forEach(lang =>
    registerLanguage(lang.name, lang.func))

  const options = {
    renderers: {
      code: Code,
      a: Link,
      heading: Header,
    },
  }

  return (
    <Wrapper>
      <Markdown {...options}>
        {props.source}
      </Markdown>
    </Wrapper>
  )
}
