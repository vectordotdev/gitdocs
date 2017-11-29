import React, { Component } from 'react'
import { Router, getSiteProps } from 'react-static'
import Routes from 'react-static-routes'
import NProgress from 'nprogress'
import Prism from 'prismjs'
import Sidebar from 'components/Sidebar'
import 'styles/global'
import Wrapper from './Wrapper'

class App extends Component {
  componentWillMount () {
    console.log('will mount')
    const { languages, theme } = this.props.config

    languages.forEach(lang => {
      if (!Prism.languages[lang]) {
        require(`prismjs/components/prism-${lang}.js`)
      }
    })

    if (theme) {
      require(`prism-themes/themes/${theme}.css`)
    }
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
