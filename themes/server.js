import React from 'react'
import { StaticRouter } from 'react-router-dom'

export default function (props, route) {
  const App = require(`${props.config.theme}/application`).default

  return (
    <StaticRouter
      context={route}
      location={route.url}
    >
      <App ssr {...props} />
    </StaticRouter>
  )
}
