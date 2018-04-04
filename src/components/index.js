import React from 'react'
import { Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Sidebar from './sidebar'

export default function (props) {
  return (
    <div>
      <Helmet>
        <title>{props.route.path} · GitDocs</title>
      </Helmet>

      <Sidebar
        routes={props.tree} />

      <Switch>
        {props.children}
      </Switch>
    </div>
  )
}
