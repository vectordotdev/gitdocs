import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  CrumbWrapper,
  Crumb,
  Seperator,
} from './styles'

const Breadcrumb = (props) => {
  // don't show breadcrumbs if there is only one item
  if (props.items.length < 2) {
    return <div />
  }

  return (
    <Wrapper>
      {props.items.map((item, i) => item.url && (
        <CrumbWrapper key={`breadcrumb-${item.title}`}>
          {i > 0 && <Seperator size={14} />}
          <Crumb to={item.url}>{item.title}</Crumb>
        </CrumbWrapper>
      ))}
    </Wrapper>
  )
}

Breadcrumb.propTypes = {
  items: PropTypes.array,
}

Breadcrumb.defaultProps = {
  items: [],
}

export default Breadcrumb
