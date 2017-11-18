import React from 'react'
import { Link } from 'react-static'
import { getDocPath } from 'utils'

const Title = ({ name, type, path }) => {
  if (type === 'directory') {
    return <div>{name}</div>
  }

  return <Link to={getDocPath(path)}>{name.replace('.md', '')}</Link>
}

const SidebarItem = ({ name, children, type, path }) => (
  <li>
    <Title
      name={name}
      type={type}
      path={path}
    />
    {
      children &&
      <ul>
        {children.map(c => (
          <SidebarItem
            {...c}
            key={c.path}
          />
        ))}
      </ul>
    }
  </li>
)

export default SidebarItem
