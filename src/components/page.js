import React from 'react'
import Markdown from 'markdown-to-jsx'

export default function (props) {
  return (
    <Markdown
      options={{ overrides: props.components }}>
      {props.route.body}
    </Markdown>
  )
}
