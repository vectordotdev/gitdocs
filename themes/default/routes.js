import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

class Routes extends Component {
  route = ({ items = [], ...data }) => {
    const {
      sticky,
      socketUrl,
      componentPage: Page,
    } = this.props

    return [
      items.map(this.route),
      data.url && [
        <Route
          exact
          strict
          key={`route-${data.url}`}
          path={data.url}
          render={({ staticContext }) => (
            <Page
              route={staticContext || data}
              socketUrl={socketUrl}
              sticky={sticky}
            />
          )}
        />,
        data.url !== '/' &&
          <Redirect
            exact
            strict
            key={`redirect-${data.url}`}
            from={data.url.slice(0, -1)}
            to={data.url}
          />,
      ],
    ]
  }

  render () {
    const {
      manifest,
      component404: NotFound,
    } = this.props

    return (
      <Switch>
        {this.route(manifest)}
        <Route component={NotFound} />
      </Switch>
    )
  }
}

Routes.propTypes = {
  manifest: PropTypes.object.isRequired,
  componentPage: PropTypes.func.isRequired,
  component404: PropTypes.func.isRequired,
  socketUrl: PropTypes.string.isRequired,
}

export default Routes
