import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Sidebar from './sidebar'
import Page from './page'
import NotFound from './not-found'
import Routes from '../routes'

export default class extends Component {
  render () {
    const {
      name,
      sidebar,
      tree,
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
          routes={tree}
          componentPage={Page}
          component404={NotFound}
        />
      </div>
    )
  }
}
