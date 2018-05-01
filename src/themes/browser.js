import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Entry from './entry'

hydrate(
  <BrowserRouter>
    <Entry {...process.env.PROPS} />
  </BrowserRouter>,
  document.getElementById('gitdocs-app'),
)

if (module.hot) {
  module.hot.accept()
}
