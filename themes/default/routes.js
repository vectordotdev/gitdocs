import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

class Routes extends Component {
  render () {
    const {
      routes,
      socketUrl,
      componentPage: Page,
      component404: NotFound,
    } = this.props

    const pageProps = {
      socketUrl,
    }

    return (
      <Switch>
        {routes.map((route, idx) => ([
          <Route
            exact
            strict
            key={`route-${idx}`}
            path={route.url}
            render={() =>
              <Page {...pageProps} route={route} />}
          />,
          route.url !== '/' &&
            <Redirect
              exact
              strict
              key={`redirect-${idx}`}
              from={route.url.slice(0, -1)}
              to={route.url}
            />,
        ]))}

        <Route component={NotFound} />
      </Switch>
    )
  }
}

Routes.propTypes = {
  routes: PropTypes.array.isRequired,
  componentPage: PropTypes.func.isRequired,
  component404: PropTypes.func.isRequired,
  socketUrl: PropTypes.string.isRequired,
}

export default Routes
