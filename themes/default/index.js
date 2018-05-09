import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import history from './history'
// import { rehydrate } from 'glamor'
import App from './application'

const isProd = process.env.NODE_ENV === 'production'
const render = isProd
  ? ReactDOM.hydrate
  : ReactDOM.render

if (!isProd && module.hot) {
  module.hot.accept()
}

// if (window._glamorIds) {
//   rehydrate(window._glamorIds)
// }

render(
  <Router history={history}>
    <App {...process.env.PROPS} />
  </Router>,
  document.getElementById('gitdocs-app'),
)
