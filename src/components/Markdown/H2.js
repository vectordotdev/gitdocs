import React from 'react'

const Header = ({ children, id, ...rest }) => {
  if (!id) {
    id = children[0].toLowerCase().split(' ').join('-')
  }

  return (
    <h2>
      <a
        href={`#${id}`}
        id={id}
        style={{ color: 'rgba(0,0,0,.7)', margin: '1rem 0 0 0' }}
      >
        {children}
      </a>
    </h2>
  )
}

export default Header
