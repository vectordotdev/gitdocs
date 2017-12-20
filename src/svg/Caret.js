import React from 'react'
import PropTypes from 'prop-types'

const Caret = ({
  color,
  height,
  width,
  style,
  onClick,
  degrees,
  className,
}) => (
  <svg onClick={onClick} className={className} style={{ ...style, transform: `rotate(${degrees}deg)` }} width={width} height={height} viewBox="0 0 24 24">
    <path fill={color} d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
  </svg>
)

Caret.propTypes = {
  color: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  degrees: PropTypes.number,
  style: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

Caret.defaultProps = {
  className: '',
  degrees: 0,
  height: 24,
  onClick: null,
  style: {},
  width: 24,
}

export default Caret
