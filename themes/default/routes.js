import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

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
        {routes.map((route, idx) => {
          return (
            <Route
              exact
              key={`route-${idx}`}
              path={route.url}
              render={() =>
                <Page {...pageProps} route={route} />}
            />
          )
        })}

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
