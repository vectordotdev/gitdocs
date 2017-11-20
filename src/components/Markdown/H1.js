import React from 'react'

const Header = ({ children, id }) => {
  if (!id) {
    id = children[0].toLowerCase().split(' ').join('-')
  }

  return (
    <a
      href={`#${id}`}
      id={id}
      style={{ color: 'rgba(0,0,0,.7)', margin: '1rem 0 0 0' }}
    >
      <h1>{children}</h1>
    </a>
  )
}

export default Header
