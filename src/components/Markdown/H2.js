import React from 'react'

const Header = ({ children, id, ...rest }) => {
  if (!id) {
    id = children[0].toLowerCase().split(' ').join('-')
  }

  return (
    <a
      href={`#${id}`}
      id={id}
      style={{ color: 'rgba(0,0,0,.7)', margin: '1rem 0 0 0' }}
    >
      <h2>{children}</h2>
    </a>
  )
}

export default Header
