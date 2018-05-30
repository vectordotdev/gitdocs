import React from 'react'
import { StaticRouter } from 'react-router-dom'

export default function (props, route) {
  const { theme } = props.config
  const { default: App } = require(`./${theme}/application`)

  return (
    <StaticRouter
      context={route}
      location={route.url}
    >
      <App ssr {...props} />
    </StaticRouter>
  )
}
