// import path from 'path'
// import React from 'react'
// import { megaGlob } from '../utils/filesystem'
// import './register'
//
// const COMPONENTS_DIR = '_components'
//
// export default async function (baseDir) {
//   const componentMap = {}
//
//   const dir = path.resolve(baseDir, COMPONENTS_DIR)
//   const files = await megaGlob([
//     `${dir}/*.js`,
//     `${dir}/*/index.js`,
//   ], {
//     nodir: true,
//   })
//
//   // so components don't have to require react
//   global.React = React
//
//   files.forEach(file => {
//     const name = /index\.js$/.test(file)
//       ? path.basename(path.resolve(file, '..'))
//       : path.basename(file, '.js')
//
//     const module = require(file)
//     componentMap[name] = {
//       component: module.default || module,
//       props: {
//         // any extra props for custom components?
//       },
//     }
//   })
//
//   return componentMap
// }
