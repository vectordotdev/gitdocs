import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

class Routes extends Component {
  route = ({ items = [], ...data }) => {
    const {
      pageData,
      componentPage: Page,
    } = this.props

    return [
      items.map(this.route),
      data.input && [
        <Route
          exact
          strict
          key={`route-${data.url}`}
          path={data.url}
          render={({ staticContext }) => (
            <Page
              pageData={pageData}
              route={staticContext || data}
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
  pageData: PropTypes.object.isRequired,
}

export default Routes
