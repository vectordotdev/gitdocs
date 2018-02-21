import React from 'react'
import { Link, withRouter } from 'react-static'
import styled from 'styled-components'
import Caret from 'svg/Caret'

const Header = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

const Title = ({ name, link, hasChildren, expanded, ...rest }) => {
  if (hasChildren && !link) {
    return (
      <Header {...rest}>
        {name}
        {<Caret degrees={expanded ? 0 : -90} color="#AAB0B9" />}
      </Header>
    )
  }

  return (
    <Link to={link} exact activeClassName="active">
      {name}
    </Link>
  )
}

class SidebarItem extends React.Component {
  constructor (props) {
    super(props)

    const { item, config } = props

    const depth = item.path.split('/').length
    const underActiveRoute = this.getUnderActiveRoute(props)

    this.state = {
      expanded:
        depth <= config.sidebar.defaultDepth ||
        underActiveRoute ||
        typeof item.expanded !== 'undefined'
          ? item.expanded
          : true,
    }
  }

  componentWillReceiveProps (nextProps) {
    if (
      this.props.location &&
      nextProps.location &&
      this.props.location.pathname !== nextProps.location.pathname &&
      this.getUnderActiveRoute(nextProps)
    ) {
      this.setState({
        expanded: true,
      })
    }
  }

  onToggleExpander = e => {
    e.stopPropagation()
    this.setState({ expanded: !this.state.expanded })
  }

  getUnderActiveRoute = props =>
    props.location &&
    (props.item.path.includes(props.location.pathname) ||
      (props.children && props.children.find(c => props.doc.path.includes(c.path)) !== undefined))

  render () {
    const { item: { name, children, link }, config } = this.props

    const expanded = link || this.state.expanded

    return (
      <li>
        <Title
          name={name}
          link={link}
          hasChildren={children}
          expanded={expanded}
          onClick={this.onToggleExpander}
        />
        {expanded &&
          children && (
            <ul>
              {children.map(item => <SidebarItem item={item} key={item.name} config={config} />)}
            </ul>
          )}
      </li>
    )
  }
}

export default withRouter(SidebarItem)
