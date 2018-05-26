import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { hydrate } from 'emotion'
import { registerLanguage as registerHighlight } from 'react-syntax-highlighter/light'
import { registerLanguage as registerPrism } from 'react-syntax-highlighter/prism-light'
import { languages } from '@codegen/loadSyntax' // eslint-disable-line
import history from './history'
import App from './application'

const { _EMOTION_IDS_ } = window
const isDev = process.env.NODE_ENV === 'development'

// https://github.com/timberio/gitdocs/issues/114
// const render = isDev ? ReactDOM.render : ReactDOM.hydrate
const render = ReactDOM.render

isDev && module.hot && module.hot.accept()
_EMOTION_IDS_ && hydrate(_EMOTION_IDS_)

// Ensure required languages are registered
const renderers = {
  hljs: registerHighlight,
  prism: registerPrism,
}

if (window) {
  const register = renderers[process.env.PROPS.config.syntax.renderer]
  languages.forEach(lang => register(lang.name, lang.func))
}

render(
  <Router history={history}>
    <App {...process.env.PROPS} />
  </Router>,
  document.getElementById('gitdocs-app'),
)
