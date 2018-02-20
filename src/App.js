import { hot } from 'react-hot-loader'
import React, { Component } from 'react'
import { Router, withSiteData, onLoading } from 'react-static'
import Routes from 'react-static-routes'
import NProgress from 'nprogress'
//
import Sidebar from 'components/Sidebar'
import 'styles/global'
import Wrapper from './Wrapper'
import defaultSidebar from '../default.json'

class App extends Component {
  static defaultProps = defaultSidebar

  state = {
    sidebarIsOpen: true, // window ? window.innerWidth > 700 : true,
    width: 500, // window && window.innerWidth,
  }

  componentDidMount () {
    onLoading(loading => {
      if (loading) {
        NProgress.start()
      } else {
        NProgress.done()
      }
    })

    if (window) {
      window.addEventListener('resize', this.updateDimensions)
      this.setState({
        width: window.innerWidth,
        sidebarIsOpen: window.innerWidth > 700,
      })
    }
  }

  componentWillUnmount () {
    if (window) {
      window.removeEventListener('resize', this.updateDimensions)
    }
  }

  onSidebarToggle = () => {
    this.setState({
      sidebarIsOpen: !this.state.sidebarIsOpen,
    })
  }

  updateDimensions = e => {
    // TODO: Debounce this
    this.setState({
      width: e.target.innerWidth,
      sidebarIsOpen: e.target.innerWidth > 700,
    })
  }

  render () {
    const { tree, config } = this.props
    const { sidebarIsOpen } = this.state

    return (
      <Router scrollToHashOffset={-40}>
        <Wrapper sidebarIsOpen={sidebarIsOpen}>
          <Sidebar
            tree={tree}
            config={config}
            sidebarIsOpen={sidebarIsOpen}
            onSidebarToggle={this.onSidebarToggle}
          />
          <Routes />
        </Wrapper>
      </Router>
    )
  }
}

export default hot(module)(withSiteData(App))
