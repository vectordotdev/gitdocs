import React from 'react'
import { Link } from 'react-static'
import { getDocPath } from 'utils'

const Title = ({ name, type, path, doc = {} }) => {
  if (type === 'directory') {
    return <h3>{name}</h3>
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

const SidebarItem = ({ name, children, type, path, doc }) => (
  <li>
    <Title
      name={name}
      type={type}
      path={path}
      doc={doc}
    />
    {
      children &&
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

export default SidebarItem
