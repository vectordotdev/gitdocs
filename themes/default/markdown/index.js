import React from 'react'
// import Markdown from 'react-markdown'
import Markdown from 'markdown-to-jsx'
import { Wrapper } from './styles'
import Code from './overrides/Code'
import Header from './overrides/Header'
import Link from './overrides/Link'

export default function (props) {
  // const options = {
  //   renderers: {
  //     code: p => <Code {...props} {...p} />,
  //     link: Link,
  //     heading: Header,
  //   },
  // }

  const options = {
    overrides: {
      code: {
        component: Code,
        props: { renderer: props.renderer, lineNumbers: props.lineNumbers }
      },
      h1: Header,
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
