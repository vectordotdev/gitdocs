import React from 'react'
import { Router, Link, getSiteProps } from 'react-static'
import styled, { injectGlobal } from 'styled-components'
import Routes from 'react-static-routes'

import Sidebar from 'components/Sidebar'

injectGlobal`
  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
`

const AppStyles = styled.div`
  display: flex;
`

const App = ({ tree }) => (
  <Router>
    <AppStyles>
      <Sidebar tree={tree} />
      <div className="content">
        <Routes />
      </div>
    </AppStyles>
  </Router>
)

export default getSiteProps(App)
