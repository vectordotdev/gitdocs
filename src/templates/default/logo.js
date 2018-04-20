import React from 'react'
import { Link } from 'react-router-dom'

export default function (props) {
  return (
    <div>
      <Link to="/">{props.children}</Link>
    </div>
  )
}
