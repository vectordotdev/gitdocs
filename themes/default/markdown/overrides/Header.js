import React from 'react'
import styled from 'react-emotion'

const Link = styled('a')`
  color: rgba(0,0,0,.7);
  margin: 1rem 0 0 0;
  text-decoration: none;
  display: block;

  &:hover {
    ::after {
      position: relative;
      left: 10px;
      content: "\u21b5";
      font-weight: bold;
      display: inline-block;
    }
  }
`

const style = {
  display: 'inline-block'
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
    <Link href={`#${id}`} id={id}>
      {React.createElement(el, { children, style })}
    </Link>
  )
}

export default Header
