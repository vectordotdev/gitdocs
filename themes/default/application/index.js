import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Theme } from '@timberio/ui'
import Helmet from 'react-helmet'
import raf from 'raf'
import Header from '../header'
import Sidebar from '../sidebar'
import Page from '../page'
import NotFound from '../not-found'
import Routes from '../routes'
import { ConfigContext } from '../context'
import { Wrapper, WrapperNav, WrapperPage } from './styles'

class App extends Component {
  state = { sticky: false }

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      this._wrapper.scrollTo(0, 0)
    }
  }

  handleScroll = e => {
    if (!this.framePending) {
      const { currentTarget } = e

      raf(() => {
        this.framePending = false
        const { sticky } = this.state

        if (!sticky && currentTarget.scrollTop > 70) {
          this.setState({ sticky: true })
        } else if (sticky && currentTarget.scrollTop < 70) {
          this.setState({ sticky: false })
        }
      })
      this.framePending = true
    }
  }

  render () {
    const {
      config,
      manifest,
    } = this.props

    return (
      <ConfigContext.Provider value={config}>
        <Theme>
          <Wrapper>
            <Helmet
              defaultTitle={manifest.title}
              titleTemplate={`%s · ${manifest.title}`}
            >
              <html lang="en" />
              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              {manifest.description && <meta
                name="description"
                content={manifest.description}
              />}
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600"
              />
            </Helmet>

            <WrapperNav>
              <Sidebar
                manifest={manifest}
                customLogo={config.logo}
              />
            </WrapperNav>

            <WrapperPage
              innerRef={ref => this._wrapper = ref}
              onScroll={this.handleScroll}
            >
              <Header
                isSSR={this.props.ssr}
                manifest={manifest}
              />

              <Routes
                manifest={manifest}
                componentPage={Page}
                component404={NotFound}
                pageData={{
                  sticky: this.state.sticky,
                  socketUrl: `ws://${config.host}:${config.port}`,
                }}
              />
            </WrapperPage>
          </Wrapper>
        </Theme>
      </ConfigContext.Provider>
    )
  }
}

export default withRouter(App)
