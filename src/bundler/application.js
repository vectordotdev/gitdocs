import React from 'react'
import { StaticRouter, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function (props) {
  return (
    <StaticRouter
      context={{}}
      location={props.location}>
      <div>
        <Helmet>
          <title>{props.location} · GitDocs</title>
        </Helmet>

        <nav>
          navigation!
        </nav>

        <Switch>
          {props.children}
        </Switch>
      </div>
    </StaticRouter>
  )
}
