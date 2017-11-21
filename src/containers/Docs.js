import React from 'react'
import { getRouteProps } from 'react-static'
import Markdown from 'components/Markdown'
import Doc from 'components/Doc'

const page = ({ doc }) => (
  <Doc>
    <Markdown source={doc.body} />
  </Doc>
)

export default getRouteProps(page)
