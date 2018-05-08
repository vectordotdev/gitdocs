import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

class Routes extends Component {
  render () {
    const {
      config,
      routes,
      currentRoute,
      componentPage: Page,
      component404: NotFound,
    } = this.props

    if (currentRoute) {
      return (
        <Page
          config={config}
          route={currentRoute}
        />
      )
    }

    return (
      <Switch>
        {routes.map((route, idx) => {
          return (
            <Route
              exact
              key={`route-${idx}`}
              path={route.url}
              render={() => (
                <Page
                  config={config}
                  route={route}
                />
              )}
            />
          )
        })}

        <Route component={NotFound} />
      </Switch>
    )
  }
}

Routes.propTypes = {
  config: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  currentRoute: PropTypes.object,
  componentPage: PropTypes.func.isRequired,
  component404: PropTypes.func.isRequired,
}

Routes.defaultProps = {
  currentRoute: null,
}

export default Routes
