import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'
import IconHamburger from '../icons/hamburger'
import IconClose from '../icons/close'
import IconExternal from '../icons/external'
import { ConfigContext } from '../context'
import {
  Wrapper,
  TopWrapper,
  MenuWrapper,
  Hamburger,
  Close,
  Logo,
  Nav,
  NavItem,
  NavLinks,
  Callout,
} from './styles'

class Sidebar extends Component {
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

  findActiveIndex (items = []) {
    const { pathname } = this.props.location

    return items.findIndex(item => {
      return item.link === pathname ||
        this.findActiveIndex(item.children) > -1
    })
  }

  navItems = (items, isSubnav) => {
    return (
      <NavItem
        isSubnav={isSubnav}
        selectedIdx={this.findActiveIndex(items)}
      >
        {items.map(item => {
          const trigger = item.link
            ? (
              <NavLink
                exact
                to={item.link}
                onClick={() => this.setState({ menuOpen: false })}
              >
                {item.text}
              </NavLink>
            )
            : <a>{item.text}</a>

          return (
            <div
              key={`nav-item-${item.link}`}
              trigger={trigger}
            >
              {item.children &&
                this.navItems(item.children, true)}
            </div>
          )
        })}
      </NavItem>
    )
  }

  render () {
    return (
      <ConfigContext.Consumer>
        {config =>
          <Wrapper>
            <TopWrapper>
              <Logo to="/">
                {config.name}
              </Logo>

              <Hamburger
                onClick={() => this.setState({ menuOpen: true })}
                role="presentation"
              >
                <IconHamburger />
              </Hamburger>
            </TopWrapper>

            <MenuWrapper open={this.state.menuOpen}>
              <Close
                onClick={() => this.setState({ menuOpen: false })}
                role="presentation"
              >
                <IconClose />
              </Close>

              <Nav>
                {this.navItems(config.sidebar || this.props.navtree)}

                <NavLinks>
                  {config.sidebar_links.map(({ text, ...rest }, key) => (
                    <a
                      {...rest}
                      key={`nav-link-${key}`}
                    >
                      {text} <IconExternal />
                    </a>
                  ))}
                </NavLinks>
              </Nav>

              <Callout
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/timberio/gitdocs"
              >
                Powered by GitDocs
              </Callout>
            </MenuWrapper>
          </Wrapper>
        }
      </ConfigContext.Consumer>
    )
  }
}

export default withRouter(Sidebar)
