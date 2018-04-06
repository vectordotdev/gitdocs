import path from 'path'
import fs from 'fs-extra'
import React from 'react'
import { megaGlob } from '../utils/filesystem'
import { replaceBase, removeExt, routify, htmlify } from '../utils/path'
import Page from '../components/page'

export async function generateRouteTree (baseDir, outputDir) {
  if (!await fs.pathExists(baseDir)) {
    throw new Error(`Could not find any documentation in ${baseDir}`)
  }

  const files = await megaGlob(`${baseDir}/**/*.md`, {
    nodir: true,
    ignore: ['**/_*/**']
  })

  const tree = await Promise.all(
    files.map(async file => {
      const ext = path.extname(file)
      const index = `${removeExt(file)}/index${ext}`

      if (await fs.pathExists(index)) {
        throw new Error(`Conflicting files were found:\n\t- ${file}\n\t- ${index}`)
      }

      return {
        exact: true,
        path: replaceBase(routify(file), baseDir, ''),
        output: replaceBase(htmlify(file), baseDir, outputDir),
        body: await fs.readFile(file, 'utf8'),
        component: props => <Page {...props.staticContext} />
      }
    })
  )

  return tree.sort((a, b) => a.path > b.path)
}
