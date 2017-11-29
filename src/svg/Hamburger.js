import React from 'react'

const Hamburger = ({
  color = '#444',
  height = 16,
  width = 16,
}) => (
  <svg viewBox="0 0 16 16" width={width} height={height}>
    <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
      <path d="M.5 3.5h15" />
      <path data-color="color-2" d="M.5 8.5h15" />
      <path d="M.5 13.5h8" />
    </g>
  </svg>
)

export default Hamburger
