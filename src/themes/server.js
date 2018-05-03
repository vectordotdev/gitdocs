import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { renderStaticOptimized } from 'glamor/server'
import helmet from 'react-helmet'
import App from './'
// import Navigation from './navigation'

export default function (route, props) {
  // const nav = renderToString(
  //   <Navigation
  //     items={props.manifest.navtree}
  //   />
  // )

  const rendered = renderStaticOptimized(() =>
    renderToString(
      <StaticRouter
        context={{}}
        location={route.url}
      >
        <App
          {...props}
          currentRoute={route}
          // navigation={nav}
        />
      </StaticRouter>
    ))

  return {
    ...rendered,
    helmetData: helmet.renderStatic(),
  }
}
