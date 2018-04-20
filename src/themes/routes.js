import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

export default class extends Component {
  buildRoutes (routes) {
    const {
      componentPage: Page,
    } = this.props

    return routes.map(({ children, ...route }) => {
      return (
        <Route
          exact={!children}
          key={`route-${route.path}`}
          path={route.path}
          render={() => (
            <div>
              {route.content && <Page {...route} />}
              {children && this.buildRoutes(children)}
            </div>
          )}
        />
      )
    })
  }

  render () {
    const {
      routes,
      component404,
    } = this.props

    return (
      <Switch>
        {this.buildRoutes(routes)}

        <Route component={component404} />
      </Switch>
    )
  }
}
