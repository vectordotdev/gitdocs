import React from 'react'
import Markdown from 'markdown-to-jsx'
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
    overrides: {
      code: {
        props,
        component: Code,
      },
      a: {
        component: Link,
      },
      h1: {
        props: { el: 'h1' },
        component: Header
      },
      h2: {
        props: { el: 'h2' },
        component: Header
      },
      h3: {
        props: { el: 'h3' },
        component: Header
      },
      h4: {
        props: { el: 'h4' },
        component: Header
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
