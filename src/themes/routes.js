import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

class Routes extends Component {
  render () {
    const {
      routes,
      currentRoute,
      socketUrl,
      componentPage: Page,
      component404: NotFound,
    } = this.props

    if (currentRoute) {
      return (
        <Page
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
                  route={route}
                  socketUrl={socketUrl}
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
  currentRoute: PropTypes.object,
  routes: PropTypes.array.isRequired,
  componentPage: PropTypes.func.isRequired,
  component404: PropTypes.func.isRequired,
}

Routes.defaultProps = {
  currentRoute: null,
}

export default Routes
