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

export default function (props) {
  const {
    id,
    el,
    children,
  } = props

  const itemId = id || children[0]
    .toLowerCase()
    .split(' ')
    .join('-')

  if (!el) {
    return <h1>{children}</h1>
  }

  return (
    <Link href={`#${itemId}`} id={itemId}>
      {React.createElement(el, { style }, children)}
    </Link>
  )
}
