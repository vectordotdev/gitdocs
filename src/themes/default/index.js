import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import normalize from 'styled-normalize'
import Helmet from 'react-helmet'
import Sidebar from './sidebar'
import Routes from '../routes'
import Page from './page'
import NotFound from './not-found'

injectGlobal`${normalize}`

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 30px auto;
`

const PageWrapper = styled.div`
  padding: 20px 50px;
  margin-left: 280px;
`

export default class extends Component {
  render () {
    const {
      config,
      manifest,
      // passed in for ssr only
      route,
      navigation,
    } = this.props

    return (
      <div>
        <Helmet
          defaultTitle={config.name}
          titleTemplate={`%s · ${config.name}`}
        />

        <Wrapper>
          <Sidebar
            name={config.name}
            logo={config.logo}
            links={manifest.navtree}
            navigation={navigation}
          />

          <PageWrapper>
            <Routes
              routes={manifest.files}
              currentRoute={route}
              componentPage={Page}
              component404={NotFound}
              socketUrl={`ws://${config.host}:${config.port}`}
            />
          </PageWrapper>
        </Wrapper>
      </div>
    )
  }
}
