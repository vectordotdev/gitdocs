import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import helmet from 'react-helmet'
import App from './'
// import Navigation from './navigation'

export default function (route, props) {
  // const nav = renderToString(
  //   <Navigation
  //     items={props.manifest.navtree}
  //   />
  // )

  const sheet = new ServerStyleSheet()
  const rendered = renderToString(
    sheet.collectStyles(
      <StaticRouter
        context={{}}
        location={route.url}
      >
        <App
          {...props}
          route={route}
          // navigation={nav}
        />
      </StaticRouter>
    )
  )

  const helmetData = helmet.renderStatic()
  const styleTags = sheet.getStyleTags()

  return {
    rendered,
    helmetData,
    styleTags,
  }
}
