import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  CrumbWrapper,
  Crumb,
  CrumbInactive,
  Seperator,
} from './styles'

const Breadcrumbs = (props) => {
  // don't show breadcrumbs if there is only one item
  if (props.items.length < 2) {
    return <div />
  }

  return (
    <Wrapper>
      {props.items.map((item, i) => (
        <CrumbWrapper key={`breadcrumbs-${item.title}`}>
          {i > 0 && <Seperator size={14} />}
          {item.url
            ? <Crumb to={item.url}>{item.title}</Crumb>
            : <CrumbInactive>{item.title}</CrumbInactive>}
        </CrumbWrapper>
      ))}
    </Wrapper>
  )
}

Breadcrumbs.propTypes = {
  items: PropTypes.array,
}

Breadcrumbs.defaultProps = {
  items: [],
}

export default Breadcrumbs
