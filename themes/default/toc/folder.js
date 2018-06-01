import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, FolderItem } from './styles'

const Toc = (props) => {
  return (
    <Wrapper>
      {props.items.map(item => (
        <FolderItem
          key={`toc-${item.url}`}
          to={item.url}
        >
          <b>{item.title}</b>
          {item.description}
        </FolderItem>
      ))}
    </Wrapper>
  )
}

Toc.defaultProps = {
  items: [],
}

Toc.propTypes = {
  items: PropTypes.array,
}

export default Toc
