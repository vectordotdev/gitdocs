import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'
import { Reveal } from '@timberio/ui'
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
  NavList,
  Callout,
} from './styles'

class Sidebar extends Component {
  static propTypes = {
    manifest: PropTypes.object,
  }

  static defaultProps = {
    manifest: {
      items: [],
    },
  }

  constructor () {
    super()
    this.state = {
      menuOpen: false,
    }
  }

  findActiveIndex = (items = []) => {
    const { pathname } = this.props.location

    return items.findIndex(item => {
      return item.url === pathname ||
        this.findActiveIndex(item.items) > -1
    })
  }

  renderTrigger = ({ title, url, component }) => {
    // @TODO: custom components
    if (component) {
      // return (
      //   <div>{`<${component} />`}</div>
      // )
    }

    if (!url) {
      return <a href="#">{title}</a>
    }

    if (/^https?:\/\//i.test(url)) {
      return (
        <a
          href={url}
          target="_blank"
        >
          {title} <IconExternal />
        </a>
      )
    }

    return (
      <NavLink
        exact
        to={url}
        onClick={() => this.setState({ menuOpen: false })}
      >
        {title}
      </NavLink>
    )
  }

  renderNavItems = (items, isFirst) => {
    return (
      <NavList
        isFirst={isFirst}
        selectedIdx={this.findActiveIndex(items)}
      >
        {items
          .filter(i => !i.draft)
          .map(item => {
            return (
              <Reveal
                key={`nav-item-${item.url}`}
                trigger={() => this.renderTrigger(item)}
              >
                {item.items &&
                  this.renderNavItems(item.items)}
              </Reveal>
            )
          })}
      </NavList>
    )
  }

  render () {
    const {
      manifest,
    } = this.props

    return (
      <ConfigContext.Consumer>
        {config =>
          <Wrapper>
            <TopWrapper>
              <Logo to={manifest.url}>
                {manifest.title}
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
                {this.renderNavItems(manifest.items, true)}
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
