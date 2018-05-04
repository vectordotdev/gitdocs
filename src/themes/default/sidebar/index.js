import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'glamor'
import { Accordion } from 'react-interface'
import Callout from '../callout'
import styles from './styles'

// function hasActiveLink (url, items) {
//   return items.findIndex(item => {
//     if (item.link === location.pathname) {
//       return true
//     }

//     if (item.children) {
//       return hasActiveLink(url, item.children)
//     }

//     return false
//   })
// }

// function hasActiveLink (url, items) {
//   if (items) {
//     for (var i = 0; i < items.length; i++) {
//       if (url === items[i].link) {
//         console.log('found:', items[i])
//         return i
//       }

//       return hasActiveLink(url, items[i].children)
//     }
//   }
// }

function navItems (path, items, parentIdx = 0) {
  return (
    <Accordion
      className={styles.nav}
      // selectedIdx={hasActiveLink(path, items)}
    >
      {items.map((item, idx) => {
        const isActive = path === item.link
        const triggerClass = css(
          styles.navItem,
          isActive ? styles.navItemActive : null,
        )

        const trigger = item.link
          ? <Link className={triggerClass} to={item.link}>{item.text}</Link>
          : <span className={triggerClass}>{item.text}</span>

        return (
          <div
            key={`nav-${item.link}`}
            trigger={trigger}
          >
            {item.children &&
              navItems(path, item.children, parentIdx + 1)}
          </div>
        )
      })}
    </Accordion>
  )
}

export default function (props) {
  const path = props.currentRoute
    ? props.currentRoute.url
    : window.location.pathname

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperNav}>
        {navItems(path, props.links)}
      </div>

      <Callout />
    </div>
  )
}
