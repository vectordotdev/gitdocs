import React from 'react'
import PropTypes from 'prop-types'
import { PageItem } from './styles'

const Toc = (props) => {
  // Don't show this if there aren't enough headers
  if (props.items.length < 2) return null

  // Create TOC hierarchy and link to headers
  const items = props.items.map(t => (
    <li key={`${props.items}-${t.slug}`}>
      <a href={`#${t.slug}`}>
        {t.content}
      </a>
    </li>
  ))

  return (
    <PageItem sticky={props.sticky}>
      <div>
        <h5>Table of Contents</h5>
        <ul>{items}</ul>
      </div>
    </PageItem>
  )
}

Toc.defaultProps = {
  items: [],
}

Toc.propTypes = {
  items: PropTypes.array,
}

export default Toc
