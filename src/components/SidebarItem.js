import React from 'react'
import { Link } from 'react-static'
import { getDocPath } from 'utils'

const Title = ({ name, type, path, doc }) => {
  console.log(path, doc.path)
  if (type === 'directory') {
    return <h3>{name}</h3>
  }

  const className = path.includes(window.location.pathname)
    ? 'active link'
    : 'link'

  return (
    <Link to={getDocPath(path)} className={className}>
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
