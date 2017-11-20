import React from 'react'

const Checkmark = ({
  color,
  strokeWidth,
  height,
  width,
}) => (
  <svg width={width || 24} height={height || 24} viewBox="0 0 24 24">
    <path strokeWidth={strokeWidth || '2'} fill={color || '#5E61A2'} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

export default Checkmark
