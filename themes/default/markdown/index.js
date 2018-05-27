import React from 'react'
// import Markdown from 'react-markdown'
import Markdown from 'markdown-to-jsx'
import { Wrapper } from './styles'
import Code from './overrides/Code'
import Header from './overrides/Header'
import Link from './overrides/Link'

export default function (props) {
  const options = {
    overrides: {
      code: {
        component: Code,
        props: {
          renderer: props.renderer,
          lineNumbers: props.lineNumbers
        }
      },
      h1: {
        component: Header,
        props: { level: 1 },
      },
      h2: {
        component: Header,
        props: { level: 2 },
      },
      h3: {
        component: Header,
        props: { level: 3 },
      },
      h4: {
        component: Header,
        props: { level: 4 },
      },
      h5: {
        component: Header,
        props: { level: 5 },
      },
      h6: {
        component: Header,
        props: { level: 6 },
      },
      a: Link,
    }
  }

  return (
    <Wrapper>
      <Markdown options={options}>
        {props.source}
      </Markdown>
    </Wrapper>
  )
}
