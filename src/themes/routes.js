import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

class Routes extends Component {
  render () {
    const {
      routes,
      currentRoute,
      componentPage: Page,
      component404,
      socketUrl,
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

        <Route component={component404} />
      </Switch>
    )
  }
}

Routes.propTypes = {
  routes: PropTypes.array.isRequired,
  currentRoute: PropTypes.object,
  componentPage: PropTypes.func.isRequired,
  component404: PropTypes.func.isRequired,
}

export default Routes
