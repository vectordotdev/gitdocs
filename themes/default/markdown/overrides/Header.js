import React from 'react'

const style = {
  color: 'rgba(0,0,0,.7)',
  margin: '1rem 0 0 0',
  textDecoration: 'none',
}

const Header = ({ children, id, el, ...rest }) => {
  if (!id) {
    id = children[0]
      .toLowerCase()
      .split(' ')
      .join('-')
  }

  if (!el) {
    return <h1>{children}</h1>
  }

  return (
    <a href={`#${id}`} id={id} style={style}>
      {React.createElement(el, { children })}
    </a>
  )
}

export default Header
