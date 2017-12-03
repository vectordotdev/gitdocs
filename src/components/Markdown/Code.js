import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import PrismHighlighter from 'react-syntax-highlighter/prism'

export default options => ({ className, children }) => {
  const language = className ? className.split('-')[0] : null

  if (!language) {
    return <code>{children}</code>
  }

  const shouldShowLineNumbers = options.showLineNumbers

  // Handle toggling of line numbers in markdown
  // if (language.includes('no-line-numbers')) {
  //   shouldShowLineNumbers = false
  //   language = language.replace('_no-line-numbers', '')
  // } else if (language.includes('line-numbers')) {
  //   shouldShowLineNumbers = true
  //   language = language.replace('_line-numbers', '')
  // }

  const langClass = `syntax-${language} ${shouldShowLineNumbers ? 'line-numbers' : 'no-line-numbers'}`

  const props = {
    language,
    useInlineStyles: options.theme !== undefined,
    style: options.theme,
    showLineNumbers: shouldShowLineNumbers,
    lineNumberStyle: { opacity: 0.3 },
    children,
    PreTag: 'div',
    codeTagProps: {
      className: langClass,
    },
  }

  if (options.highlighter === 'prism') {
    return <PrismHighlighter {...props} />
  }

  return (
    <SyntaxHighlighter {...props} />
  )
}
