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
    <Link to={href} className={className}>
      {name.replace('.md', '')}
    </Link>
  )
}

class SidebarItem extends React.Component {
  constructor (props) {
    super(props)
    const depth = getDocPath(props.path).split('/').length
    const underActiveRoute = props.doc.path.includes(getDocPath(props.path))

    this.state = {
      expanded: depth < 3 || underActiveRoute,
    }
  }

  componentWillReceiveProps (nextProps) {
    const depth = getDocPath(nextProps.path).split('/').length
    const underActiveRoute = nextProps.doc.path.includes(getDocPath(nextProps.path))
    this.setState({
      expanded: depth < 3 || underActiveRoute,
    })
  }

  handleClick = e => {
    e.stopPropagation()
    this.setState({ expanded: !this.state.expanded })
  }

  render () {
    const { name, children, type, path, doc } = this.props

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
              />
            ))}
          </ul>
        }
      </li>
    )
  }
}

export default SidebarItem
