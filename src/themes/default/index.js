import 'glamor/reset'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Sidebar from './sidebar'
import Routes from '../routes'
import Page from './page'
import NotFound from './not-found'
import styles from './styles'

export default class extends Component {
  render () {
    const {
      config,
      manifest,
      // passed in for ssr only
      currentRoute,
    } = this.props

    return (
      <div>
        <Helmet
          defaultTitle={config.name}
          titleTemplate={`%s · ${config.name}`}
        />

        <div {...styles.wrapper}>
          <Sidebar
            name={config.name}
            logo={config.logo}
            links={manifest.navtree}
          />

          <Routes
            routes={manifest.files}
            currentRoute={currentRoute}
            socketUrl={`ws://${config.host}:${config.port}`}
            componentPage={Page}
            component404={NotFound}
          />
        </div>
      </div>
    )
  }
}
