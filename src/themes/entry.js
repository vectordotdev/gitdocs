import React, { Component } from 'react'

export default class extends Component {
  render () {
    const module = require(`./${this.props.config.theme}`)
    const App = module.default || module

    return <App {...this.props} />
  }
}
