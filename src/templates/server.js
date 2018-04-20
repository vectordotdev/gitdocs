import React from 'react'
import { StaticRouter } from 'react-router-dom'

export default function (route, tree, props) {
  const module = require(`./${props.template}/index.js`)
  const Application = module.default || module

  return (
    <StaticRouter
      context={{}}
      location={route.path}
    >
      <Application
        {...props}
        route={route}
        routeTree={tree}
      />
    </StaticRouter>
  )
}
