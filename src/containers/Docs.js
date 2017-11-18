import React from 'react'
import { getRouteProps } from 'react-static'
import Smackdown from 'react-smackdown'

const page = ({ doc }) => (console.log(doc),
  <div>
    <Smackdown source={doc.body} />
  </div>
)

export default getRouteProps(page)
