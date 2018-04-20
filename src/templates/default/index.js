import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Sidebar from './sidebar'
import Page from './page'
import NotFound from './not-found'
import Routes from '../_shared/routes'

export default class extends Component {
  render () {
    const {
      name,
      sidebar,
      routeTree,
    } = this.props

    return (
      <div>
        <Helmet
          defaultTitle={name}
          titleTemplate={`%s · ${name}`}
        />

        <Sidebar
          name={name}
          links={sidebar}
        />

        <Routes
          routes={routeTree}
          componentPage={Page}
          component404={NotFound}
        />
      </div>
    )
  }
}
