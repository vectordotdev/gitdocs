import React from 'react'
import Checkmark from 'svg/Checkmark'
import Link from 'svg/Link'

const Icon = ({ className }) => {
  switch (className) {
    case 'doc-plus':
      return <Checkmark />
    case 'link':
      return <Link />
    default:
      return <Checkmark />
  }
}

export default Icon
