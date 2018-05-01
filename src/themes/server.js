import React from 'react'
import { StaticRouter } from 'react-router-dom'
import Entry from './entry'

export default function (path, props) {
  return (
    <StaticRouter
      context={{}}
      location={path}
    >
      <Entry {...props} />
    </StaticRouter>
  )
}
