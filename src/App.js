import React, { Component } from 'react'
import { Router, getSiteProps } from 'react-static'
import { injectGlobal } from 'styled-components'
import Routes from 'react-static-routes'
import NProgress from 'nprogress'
import Sidebar from 'components/Sidebar'
import Wrapper from './Wrapper'

injectGlobal`
  body {
    font-family: aktiv-grotesk,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue;
    font-weight: 400;
    font-size: 14px;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }
`

class App extends Component {
  componentDidMount () {
    Router.subscribe(loading => {
      if (loading) {
        NProgress.start()
      } else {
        NProgress.done()
        window.scrollTo(0, 0)
      }
    })
  }

  render () {
    const { tree, toc } = this.props

    return (
      <Router>
        <Wrapper>
          <Sidebar tree={tree} toc={toc} />
          <Routes />
        </Wrapper>
      </Router>
    )
  }
}

export default getSiteProps(App)
