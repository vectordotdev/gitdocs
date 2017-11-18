import React from 'react'
import { getRouteProps } from 'react-static'
import Smackdown from 'react-smackdown'

export default getRouteProps(({ tree, files }) => (
  <div>
    {Object.keys(files).map(f => <Smackdown source={files[f]} /> )}
  </div>
))
