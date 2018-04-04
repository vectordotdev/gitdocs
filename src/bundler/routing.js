import path from 'path'
import fs from 'fs-extra'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { renderRoutes } from 'react-router-config'
import helmet from 'react-helmet'
import pathExtra from '../utils/path'
import Application from './application'

export function renderTree (tree, location) {
  const rendered = renderToString(
    <Application location={location}>
      {renderRoutes(tree)}
    </Application>
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
    const basename = path.basename(file)
    const extension = path.extname(file)

    if (excludePattern.test(basename)) {
      return
    }

    if (stats.isDirectory()) {
      const ls = await fs.readdir(file)
      return Promise.all(
        ls.map(child => _walk(`${file}/${child}`))
      )
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
        exact: true,
        path: pathExtra.replaceBase(pathExtra.routify(file), baseDir, ''),
        output: pathExtra.replaceBase(pathExtra.htmlify(file), baseDir, outputDir),
        component: () => <div>{file}</div>
      })
    }
  }

  await _walk(baseDir)
  return tree
}
