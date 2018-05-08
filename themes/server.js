import React from 'react'
import { StaticRouter } from 'react-router-dom'
import App from './'

export default function (route, props) {
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
