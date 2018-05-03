import React from 'react'
import { Link } from 'react-router-dom'
import { Accordion } from 'react-interface'
import Callout from '../callout'
import styles from './styles'

function navItems (items, lvl = 0) {
  return (
    <Accordion style={{ marginLeft: `${lvl * 15}px` }}>
      {items.map(item => {
        const trigger = item.link
          ? <Link to={item.link}>{item.text}</Link>
          : item.text

        return (
          <div
            key={`nav-${item.link}`}
            trigger={trigger}
          >
            {item.children &&
              navItems(item.children, lvl + 1)}
          </div>
        )
      })}
    </Accordion>
  )
}

export default function (props) {
  // const logo = props.logo
  //   ? <img src={require(`docs/${props.logo}`)} />
  //   : props.name

  return (
    <div {...styles.wrapper}>
      <div
        {...styles.logo}
        to="/"
      >
        {props.name}
      </div>

      {navItems(props.links)}

      <Callout />
    </div>
  )
}
