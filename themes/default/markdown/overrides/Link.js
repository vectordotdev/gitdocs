import React from 'react'
import { Link } from 'react-router-dom'

export default function (props) {
  const { href, children, ...rest } = props
  const isExternal = /^https?:\/\//.test(href)

  return isExternal
    ? <a {...props} target="_blank">{children}</a>
    : <Link {...rest} to={href}>{children}</Link>
}
