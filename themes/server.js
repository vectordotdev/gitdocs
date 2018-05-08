import React from 'react'
import { StaticRouter } from 'react-router-dom'

export default function (route, props) {
  const { theme } = props.config
  const App = require(`./${theme}/application`).default

  return (
    <StaticRouter
      context={{}}
      location={route.url}
    >
      <App
        {...props}
        currentRoute={route}
      />
    </StaticRouter>
  )
}
