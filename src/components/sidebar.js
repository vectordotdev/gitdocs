import React from 'react'
import { Link } from 'react-router-dom'

export default function (props) {
  return (
    <ul>
      {props.routes.map(route => (
        <li key={`nav-${route.path}`}>
          <Link to={route.path}>{route.path}</Link>
        </li>
      ))}
    </ul>
  )
}
