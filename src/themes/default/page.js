import React from 'react'
import Helmet from 'react-helmet'
import Markdown from 'markdown-to-jsx'

export default function (props) {
  return (
    <div>
      <Helmet>
        <title>{props.meta.title}</title>
      </Helmet>

      <Markdown>
        {props.content}
      </Markdown>
    </div>
  )
}
