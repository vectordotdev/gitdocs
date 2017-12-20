import React, { Component } from 'react'
import { Router, getSiteProps } from 'react-static'
import Routes from 'react-static-routes'
import NProgress from 'nprogress'
import Sidebar from 'components/Sidebar'
import Toggle from 'elements/Toggle'
import 'styles/global'
import Wrapper from './Wrapper'

class App extends Component {
  state = {
    sidebarIsOpen: true, // window ? window.innerWidth > 700 : true,
    width: 500, // window && window.innerWidth,
  }

  componentDidMount () {
    Router.subscribe(loading => {
      if (loading) {
        NProgress.start()
      } else {
        NProgress.done()
        window.scrollTo(0, 0)
      }
    })

    // if (config.languages) {
    //   config.languages.forEach(l => {
    //     try {
    //       const lang = require(`react-syntax-highlighter/languages/hljs/${l}`).default
    //       config.syntaxes[l] = lang
    //       console.log(typeof lang)
    //     } catch (e) {
    //       //
    //     }
    //   })
    // }

    if (window) {
      window.addEventListener('resize', this.updateDimensions)
    }
  }

  componentWillUnmount () {
    if (window) {
      window.removeEventListener('resize', this.updateDimensions)
    }
  }

  updateDimensions = e => {
    // TODO: Debounce this
    this.setState({
      width: e.target.innerWidth,
      sidebarIsOpen: e.target.innerWidth > 700,
    })
  }

  handleSidebarToggle = () => {
    this.setState({
      sidebarIsOpen: !this.state.sidebarIsOpen,
    })
  }

  render () {
    const { tree, toc, config } = this.props
    const sideBarRight = config.sidebar && config.sidebar.position === 'right'
    const sidebar = (
      <Sidebar
        tree={tree}
        toc={toc}
        config={config}
        sidebarIsOpen={this.state.sidebarIsOpen}
      />
    )
    const toggle = (
      <Toggle
        onClick={this.handleSidebarToggle}
        sidebarIsOpen={this.state.sidebarIsOpen}
        position={config.sidebar.position}
      />
    )

    return (
      <Router>
        <Wrapper>
          {!sideBarRight && [sidebar, toggle]}
          <Routes />
          {sideBarRight && [toggle, sidebar]}
        </Wrapper>
      </Router>
    )
  }
}

export default getSiteProps(App)
