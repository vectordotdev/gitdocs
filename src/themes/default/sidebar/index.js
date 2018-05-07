import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import { css } from 'glamor'
import { Accordion } from 'react-interface'
import IconHamburger from '../icons/hamburger'
import IconClose from '../icons/close'
import IconLink from '../icons/link'
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

export default class extends Component {
  static propTypes = {
    links: PropTypes.array,
  }

  static defaultProps = {
    links: [],
  }

  constructor () {
    super()
    this.state = {
      menuOpen: false,
    }
  }

  navItems = (path, items, firstLevel) => {
    const className = css(
      styles.navItem,
      !firstLevel ? styles.navItemNotFirst : '',
    )

    return (
      <Accordion
        className={className}
        // selectedIdx={hasActiveLink(path, items)}
      >
        {items.map(item => {
          const trigger = item.link
            ? <NavLink exact to={item.link}>{item.text}</NavLink>
            : <a>{item.text}</a>

          return (
            <div
              key={`nav-item-${item.link}`}
              // onClick={() => this.setState({ menuOpen: false })}
              trigger={trigger}
            >
              {item.children &&
                this.navItems(path, item.children)}
            </div>
          )
        })}
      </Accordion>
    )
  }

  render () {
    const path = this.props.currentRoute
      ? this.props.currentRoute.url
      : window.location.pathname

    const menuClassName = css(
      styles.menuWrapper,
      this.state.menuOpen ? styles.menuWrapperOpen : '',
    )

    return (
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <Link className={styles.logo} to="/">
            {this.props.name}
          </Link>

          <div
            className={styles.hamburger}
            onClick={() => this.setState({ menuOpen: true })}
            role="presentation"
          >
            <IconHamburger className={styles.icons} />
          </div>
        </div>

        <div className={menuClassName}>
          <div
            className={styles.close}
            onClick={() => this.setState({ menuOpen: false })}
            role="presentation"
          >
            <IconClose className={styles.icons} />
          </div>

          <nav className={styles.nav}>
            <div className={styles.navTree}>
              {this.navItems(path, this.props.navtree, true)}
            </div>

            <div className={css(styles.navLinks, styles.navItem)}>
              {this.props.links.map(({ text, ...rest }, key) => (
                <a
                  {...rest}
                  key={`nav-link-${key}`}
                  className={styles.navItem}
                >
                  {text}
                  <IconLink />
                </a>
              ))}
            </div>
          </nav>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/timberio/gitdocs"
            className={styles.callout}
          >
            Powered by GitDocs
          </a>
        </div>
      </div>
    )
  }
}
