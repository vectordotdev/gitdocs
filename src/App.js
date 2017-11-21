import React, { Component } from 'react'
import { Router, getSiteProps } from 'react-static'
import Routes from 'react-static-routes'
import NProgress from 'nprogress'
import Sidebar from 'components/Sidebar'
import 'styles/global'
import Wrapper from './Wrapper'

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
    const { tree, toc, config } = this.props

    return (
      <Router>
        <Wrapper>
          <Sidebar
            tree={tree}
            toc={toc}
            config={config}
          />
          <Routes />
        </Wrapper>
      </Router>
    )
  }
}

export default getSiteProps(App)
