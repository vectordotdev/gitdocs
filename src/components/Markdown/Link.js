import React from 'react'
import { Link } from 'react-static'

const LinkRenderer = ({ children = [], href, name }) => {
  if (!href && name) {
    return <a href={`#${name}`} />
  }

  if (href.indexOf('://') !== -1 || href.match(/(^|[ ])#(\S+)/)) {
    return <a href={href}>{children}</a>
  }

  const to = href.charAt(0) === '/'
    ? href.replace('.md', '').toLowerCase()
    : `/${href.replace('.md', '')}`.toLowerCase()

  const className = `${window.location.pathname}${window.location.hash}` === to
    ? 'link active'
    : 'link'

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

export default LinkRenderer
