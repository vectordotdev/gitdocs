import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './logo'

export default function (props) {
  const navItems = items => (
    <ul>
      {items.map(item => (
        <li key={`nav-${item.link}`}>
          {item.link
            ? <Link to={item.link}>{item.text}</Link>
            : <div>{item.text}</div>}

          {item.children &&
            navItems(item.children)}
        </li>
      ))}
    </ul>
  )

  return (
    <div>
      <Logo>{props.name}</Logo>

      {navItems(props.links)}
    </div>
  )
}
