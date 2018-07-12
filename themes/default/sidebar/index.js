import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'
import styled from 'react-emotion'
import { Reveal } from '@timberio/ui'
import Logo from '../logo'
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
  Nav,
  NavList,
  Callout,
} from './styles'

const Divider = styled('div')`
  border-bottom: 1px solid #dfe2e6;
  margin: .5rem 1rem .5rem 0;
`

const componentMap = {
  Divider
}

class Sidebar extends Component {
  static propTypes = {
    manifest: PropTypes.object,
    customLogo: PropTypes.string,
  }

  static defaultProps = {
    customLogo: null,
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

  renderTrigger = ({ title, url, input, component }) => {
    // @TODO: custom components
    if (component) {
      return React.createElement(componentMap[component])
    }

    if (/^https?:\/\//i.test(url)) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title} <IconExternal />
        </a>
      )
    }

    // no index page, just children
    if (!input) {
      return <a>{title}</a>
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
          .filter(i => !i.hidden)
          .map((item, i) => {
            return (
              <Reveal
                key={`nav-item-${item.title}-${i}`}
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
      customLogo,
    } = this.props

    return (
      <ConfigContext.Consumer>
        {config =>
          <Wrapper>
            <TopWrapper>
              <Logo
                logo={customLogo}
                title={manifest.title}
                url={manifest.url}
              />

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
            </MenuWrapper>
            <Callout
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/timberio/gitdocs"
            >
              Powered by GitDocs
            </Callout>
          </Wrapper>
        }
      </ConfigContext.Consumer>
    )
  }
}

export default withRouter(Sidebar)
