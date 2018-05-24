import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { hydrate } from 'emotion'
import history from './history'
import App from './application'

const { _EMOTION_IDS_ } = window
const isDev = process.env.NODE_ENV === 'development'

// https://github.com/timberio/gitdocs/issues/114
// const render = isDev ? ReactDOM.render : ReactDOM.hydrate
const render = ReactDOM.render

isDev && module.hot && module.hot.accept()
_EMOTION_IDS_ && hydrate(_EMOTION_IDS_)

render(
  <Router history={history}>
    <App {...process.env.PROPS} />
  </Router>,
  document.getElementById('gitdocs-app'),
)
