import './register'
import path from 'path'
import React from 'react'
import { megaGlob } from '../utils/filesystem'

const COMPONENTS_DIR = '_components'

export async function findComponents (baseDir) {
  const componentMap = {}

  const dir = path.resolve(baseDir, COMPONENTS_DIR)
  const files = await megaGlob([
    `${dir}/*.js`,
    `${dir}/*/index.js`
  ])

  // so components don't have to require react
  global.React = React

  files.forEach(file => {
    const name = /index\.js$/.test(file)
      ? path.basename(path.resolve(file, '..'))
      : path.basename(file, '.js')

    const module = require(file)
    componentMap[name] = module.default || module
  })

  return componentMap
}
