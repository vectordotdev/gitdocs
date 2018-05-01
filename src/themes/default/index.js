import React, { Component } from 'react'
import styled, { injectGlobal } from 'styled-components'
import normalize from 'styled-normalize'
import Helmet from 'react-helmet'
import Routes from '../routes'
import Sidebar from './sidebar'
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
    } = this.props

    const socketUrl = `ws://${config.host}:${config.port}`

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
          />

          <PageWrapper>
            <Routes
              routes={manifest.files}
              componentPage={Page}
              component404={NotFound}
              socketUrl={socketUrl}
            />
          </PageWrapper>
        </Wrapper>
      </div>
    )
  }
}
