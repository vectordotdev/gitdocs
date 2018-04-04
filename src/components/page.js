import React from 'react'

export default function (props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.body }} />
  )
}
