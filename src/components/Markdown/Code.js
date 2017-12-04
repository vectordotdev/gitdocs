import React from 'react'
import cx from 'classnames'
import SyntaxHighlighter from 'react-syntax-highlighter'
import PrismHighlighter from 'react-syntax-highlighter/prism'

export default options => ({ className, children }) => {
  const { theme, highlighter, showLineNumbers } = options
  const isPrism = highlighter && highlighter.includes('prism')
  const language = className
    ? className.indexOf('-')
      ? className.split('-')[1]
      : null
    : null

  // Add theme defaults
  if (!language) {
    const codeClass = cx({
      'inline-code': true,
      'language-none': true,
      'hljs-code': !isPrism,
      hljs: !isPrism,
    })

    if (!theme) {
      return <code className={codeClass}>{children}</code>
    }

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
  }

  // data-lines="1-3"
  // diff format

  const wrapperClass = cx({
    [`syntax-${language}`]: true,
    [`language-${language}`]: true,
    'line-numbers': showLineNumbers,
    'no-line-numbers': !showLineNumbers,
  })

  const langClass = cx({
    [`syntax-${language}`]: true,
    [`language-${language}`]: true,
  })

  const props = {
    language,
    useInlineStyles: theme !== undefined,
    style: theme,
    showLineNumbers,
    lineNumberStyle: { opacity: 0.3 },
    children,
    PreTag: ({ children }) => <pre className={wrapperClass}>{children}</pre>,
    className: 'language-',
    codeTagProps: {
      className: langClass,
    },
  }

  return isPrism
    ? <PrismHighlighter {...props} />
    : <SyntaxHighlighter {...props} />
}
