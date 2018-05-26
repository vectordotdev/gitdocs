import React from 'react'
import Markdown from 'react-markdown'
import { Wrapper } from './styles'
import Code from './overrides/Code'
import Header from './overrides/Header'
import Link from './overrides/Link'

export default function (props) {
  const options = {
    renderers: {
      code: p => <Code {...props} {...p} />,
      link: Link,
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
