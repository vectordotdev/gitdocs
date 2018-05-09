import 'glamor/reset'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import Header from '../header'
import Sidebar from '../sidebar'
import Page from '../page'
import NotFound from '../not-found'
import Routes from '../routes'
import { ConfigContext } from '../context'
import styles from './styles'

class App extends Component {
  render () {
    const {
      config,
      manifest,
    } = this.props

    return (
      <ConfigContext.Provider value={config}>
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
              navtree={manifest.navtree}
            />
          </div>

          <div className={styles.page}>
            <Header manifest={manifest} />

            <Routes
              routes={manifest.files}
              componentPage={Page}
              component404={NotFound}
              socketUrl={`ws://${config.host}:${config.port}`}
            />
          </div>
        </div>
      </ConfigContext.Provider>
    )
  }
}

export default withRouter(App)