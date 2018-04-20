import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

const env = process.env.NODE_ENV
const props = process.env.PROPS

const module = require(`./${props.theme}`)
const Application = module.default || module

const render = env === 'production'
  ? ReactDOM.hydrate
  : ReactDOM.render

render(
  <BrowserRouter>
    <Application
      {...props}
    />
  </BrowserRouter>,
  document.getElementById('gitdocs-app'),
)

if (module.hot) {
  module.hot.accept()
}
