import path from 'path'
import fs from 'fs-extra'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import helmet from 'react-helmet'
import pathExtra from '../utils/path'
import Application from '../components'
import Page from '../components/page'

export function renderTree (componentProps) {
  const rendered = renderToString(
    <StaticRouter
      context={componentProps}
      location={componentProps.route.path}>
      <Application {...componentProps}>
        {renderRoutes(componentProps.tree)}
      </Application>
    </StaticRouter>
  )

  return {
    rendered,
    helmet: helmet.renderStatic()
  }
}

export async function generateTree (baseDir, outputDir) {
  if (!await fs.pathExists(baseDir)) {
    throw new Error(`Could not find any documentation in ${baseDir}`)
  }

  const tree = []
  const excludePattern = /^_/
  const extensions = ['.md']

  const _walk = async file => {
    const stats = await fs.stat(file)
    const extension = path.extname(file)

    if (excludePattern.test(path.basename(file))) {
      return
    }

    if (stats.isDirectory()) {
      const ls = await fs.readdir(file)
      return Promise.all(ls.sort().map(child => _walk(`${file}/${child}`)))
    }

    if (stats.isFile()) {
      const indexPath = `${pathExtra.removeExt(file)}/index${extension}`

      if (await fs.pathExists(indexPath)) {
        throw new Error(`Conflicting files were found:\n\t- ${file}\n\t- ${indexPath}`)
      }

      if (extensions.indexOf(extension) === -1) {
        return
      }

      tree.push({
        file,
        exact: true,
        path: pathExtra.replaceBase(pathExtra.routify(file), baseDir, ''),
        output: pathExtra.replaceBase(pathExtra.htmlify(file), baseDir, outputDir),
        component: props => <Page {...props.staticContext} />
      })
    }
  }

  await _walk(baseDir)
  return tree
}
