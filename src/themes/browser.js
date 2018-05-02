import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './'

const render = process.env.NODE_ENV === 'production'
  ? ReactDOM.hydrate
  : ReactDOM.render

render(
  <BrowserRouter>
    <App {...process.env.PROPS} />
  </BrowserRouter>,
  document.getElementById('gitdocs-app'),
)

if (module.hot) {
  module.hot.accept()
}
