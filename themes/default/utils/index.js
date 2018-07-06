import React from 'react'

export function ellipsify (text, limit) {
  if (!text) return ''

  if (text.length <= limit) {
    return text
  }

  return `${text.substring(0, limit)}...`
}

export function filterProps (element, whitelist) {
  return ({ children, ...props }) => {
    whitelist.forEach(i => delete props[i])
    return React.createElement(element, props, children)
  }
}
