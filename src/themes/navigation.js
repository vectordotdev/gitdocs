import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Navigation extends PureComponent {
  navItems (items) {
    const {
      componentNav: Nav,
      componentNavItem: NavItem,
    } = this.props

    return (
      <Nav>
        {items.map(item => (
          <NavItem key={`nav-${item.link}`}>
            {item.link
              ? <Link to={item.link}>{item.text}</Link>
              : item.text}

            {item.children &&
              this.navItems(item.children)}
          </NavItem>
        ))}
      </Nav>
    )
  }

  render () {
    return this.navItems(this.props.items)
  }
}

Navigation.propTypes = {
  items: PropTypes.array.isRequired,
  componentNav: PropTypes.func,
  componentNavItem: PropTypes.func,
}

Navigation.defaultProps = {
  componentNav: props => <ul>{props.children}</ul>,
  componentNavItem: props => <li>{props.children}</li>,
}

export default Navigation
