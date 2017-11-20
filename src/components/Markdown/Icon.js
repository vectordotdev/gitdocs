import React from 'react'
import Checkmark from 'svg/Checkmark'

const Icon = ({ className, children }) => {
  switch (className) {
    case 'doc-plus':
      return <Checkmark />
    default:
      return <Checkmark />
  }
}

export default Icon
