import React from 'react'
import cx from 'classnames'
import SyntaxHighlighter from 'react-syntax-highlighter'
import PrismHighlighter from 'react-syntax-highlighter/prism'

export default options => ({ children }) => {
  const { theme, highlighter } = options
  const isPrism = highlighter && highlighter.includes('prism')

  const codeClass = cx({
    'inline-code': true,
    'language-none': true,
    'hljs-code': !isPrism,
    hljs: !isPrism,
  })

  if (theme) {
    const codeStyle = {
      background: !isPrism
        ? theme.hljs.background
        : theme['pre[class*="language-"]'].background,
      color: !isPrism
        ? theme.hljs.color
        : theme['code[class*="language-"]'].color,
    }
    return (
      <code
        className={codeClass}
        style={codeStyle}
      >
        {children}
      </code>
    )
  }

  return <code className={codeClass}>{children}</code>
}
