import React from 'react'
import { StaticRouter } from 'react-router-dom'

export default function (route, props) {
  const { theme } = props.config
  const { default: App } = require(`./${theme}/application`)

  return (
    <StaticRouter
      context={{}}
      location={route.url}
    >
      <App {...props} />
    </StaticRouter>
  )
}
