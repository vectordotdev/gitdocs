import React, { Component } from 'react'
import { Router, getSiteProps } from 'react-static'
import Routes from 'react-static-routes'
import NProgress from 'nprogress'
import Sidebar from 'components/Sidebar'
import 'styles/global'
import Wrapper from './Wrapper'

const Prism = require('prismjs')

class App extends Component {
  componentWillMount () {
    console.log(this.props.config)
    this.props.config.languages.forEach(l => {
      if (!Prism.languages[l]) {
        require('prismjs/components/prism-' + l + '.js')
      }
    })
    console.log(Prism)
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
