import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { rehydrate } from 'glamor'
import App from './application'

const render = process.env.NODE_ENV === 'production'
  ? ReactDOM.hydrate
  : ReactDOM.render

if (module.hot) {
  module.hot.accept()
}

// if (window._glamorIds) {
//   rehydrate(window._glamorIds)
// }

render(
  <BrowserRouter>
    <App {...process.env.PROPS} />
  </BrowserRouter>,
  document.getElementById('gitdocs-app'),
)
