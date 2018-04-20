import React from 'react'
import { StaticRouter } from 'react-router-dom'

export default async function (path, props) {
  const module = require(`./${props.theme}/index.js`)
  const Application = module.default || module

  return (
    <StaticRouter
      context={{}}
      location={path}
    >
      <Application
        {...props}
      />
    </StaticRouter>
  )
}
