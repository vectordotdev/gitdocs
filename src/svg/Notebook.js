import React from 'react'

const Notebook = ({
  color,
  height,
  width,
}) => (
  <svg viewBox="0 0 24 24" width={width} height={height}>
    <g className="nc-icon-wrapper" fill="none" stroke={color} strokeWidth="2" strokeMiterlimit="10">
      <path data-cap="butt" data-color="color-2" d="M13 1v8l-3-2-3 2V1" />
      <path strokeLinecap="square" d="M5 1c-1.105 0-2 .895-2 2v18c0-1.105.895-2 2-2h14c1.105 0 2-.895 2-2V3c0-1.105-.895-2-2-2H5z" />
      <path strokeLinecap="square" d="M19 23c1.105 0 2-.895 2-2v-4c0 1.105-.895 2-2 2H5c-1.105 0-2 .895-2 2s.895 2 2 2h14z" />
    </g>
  </svg>
)

export default Notebook
