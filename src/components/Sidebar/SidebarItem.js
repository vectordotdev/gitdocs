import React from 'react'
import { Link } from 'react-static'
import styled from 'styled-components'
import { getDocPath } from 'utils'
import Caret from 'svg/Caret'

const Header = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`

const Title = ({ name, type, path, doc = {}, hasChildren, expanded }) => {
  if (type === 'directory') {
    return (
      <Header>
        {name}
        {hasChildren && <Caret degrees={expanded ? 0 : -90} color="#AAB0B9" />}
      </Header>
    )
  }

  const href = getDocPath(path)
  const className = href === doc.path
    ? 'active link'
    : 'link'

  return (
    <Link to={`/${href}`} className={className}>
      {name.replace('.md', '')}
    </Link>
  )
}

class SidebarItem extends React.Component {
  constructor (props) {
    super(props)

    const depth = getDocPath(props.path).split('/').length
    const underActiveRoute = this.getUnderActiveRoute(props)

    this.state = {
      expanded: depth < props.config.defaultDepth || underActiveRoute,
    }
  }

  componentWillReceiveProps (nextProps) {
    const depth = getDocPath(nextProps.path).split('/').length
    const underActiveRoute = this.getUnderActiveRoute(nextProps)

    this.setState({
      expanded: depth < nextProps.config.defaultDepth || underActiveRoute,
    })
  }

  getUnderActiveRoute = props => (
    props.doc.path.includes(getDocPath(props.path)) ||
    (props.children && props.children.find(c => props.doc.path.includes(c.path)) !== undefined)
  )

  handleClick = e => {
    e.stopPropagation()
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const { name, children, type, path, doc, config } = this.props

    return (
      <li onClick={this.handleClick}>
        <Title
          name={name}
          type={type}
          path={path}
          doc={doc}
          hasChildren={children}
          expanded={this.state.expanded}
        />
        {
          this.state.expanded && children &&
          <ul>
            {children.map(c => (
              <SidebarItem
                {...c}
                key={c.path}
                doc={doc}
                config={config}
              />
            ))}
          </ul>
        }
      </li>
    )
  }
}

export default SidebarItem
