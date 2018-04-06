import fs from 'fs-extra'
import React from 'react'
import helmet from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { renderRoutes } from 'react-router-config'
import { StaticRouter } from 'react-router-dom'
import template from './template'
import Application from '../components'

export async function renderTree (props) {
  const rendered = renderToString(
    <StaticRouter
      context={props}
      location={props.route.path}>
      <Application {...props}>
        {renderRoutes(props.tree)}
      </Application>
    </StaticRouter>
  )

  return {
    rendered,
    helmet: helmet.renderStatic()
  }
}

export async function staticOutput (tree, components, output) {
  await fs.emptyDir(output)

  await Promise.all(tree.map(async route => {
    const bundleFile = 'bundle.js'

    const treeRendered = await renderTree({ tree, route, components })
    const renderedPage = await template({ bundleFile, ...treeRendered })

    await fs.outputFile(route.output, renderedPage)
  }))
}
