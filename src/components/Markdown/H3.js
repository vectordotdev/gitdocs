import React from 'react'
import Link from 'svg/Link'

const Header = ({ children, id }) => {
  if (!id) {
    id = children[0].toLowerCase().split(' ').join('-')
  }

  return (
    <h3>
      <Link />
      <a
        href={`#${id}`}
        id={id}
        style={{ color: 'rgba(0,0,0,.7)', margin: '1rem 0 0 0' }}
      >
        {children}
      </a>
    </h3>
  )
}

export default Header
