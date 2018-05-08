import 'glamor/reset'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Header from '../header'
import Sidebar from '../sidebar'
import Page from '../page'
import NotFound from '../not-found'
import Routes from '../routes'
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
      <div className={styles.wrapper}>
        <Helmet
          defaultTitle={config.name}
          titleTemplate={`%s · ${config.name}`}
        >
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Overpass:300,700,900"
          />
        </Helmet>

        <div className={styles.nav}>
          <Sidebar
            name={config.name}
            logo={config.logo}
            links={config.sidebar_links}
            navtree={config.sidebar || manifest.navtree}
            currentRoute={currentRoute}
          />
        </div>

        <div className={styles.page}>
          <Header
            name={config.name}
            links={config.header_links}
          />

          <Routes
            config={config}
            routes={manifest.files}
            currentRoute={currentRoute}
            componentPage={Page}
            component404={NotFound}
          />
        </div>
      </div>
    )
  }
}
