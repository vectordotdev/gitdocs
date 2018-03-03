import React from 'react'
import { Link } from 'react-static'

const LinkRenderer = ({ children = [], href, name, doc = {} }) => {
  if (!href && name) {
    return <a href={`#${name}`}>{children}</a>
  }

  if (href.indexOf('://') !== -1 || href.match(/(^|[ ])#(\S+)/)) {
    return <a href={href}>{children}</a>
  }

  const className = doc.path === href ? 'link active' : 'link'

  if (href.charAt(0) === '/') {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export default LinkRenderer
