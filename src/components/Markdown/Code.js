import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
// import PrismHighlighter from 'react-syntax-highlighter/prism'

export default ({ code, language, children, context }) => {
  if (!language && !children) {
    return <pre>{code}</pre>
  }

  // <code>
  if (children && !code && !language) {
    return <code>{children}</code>
  }

  let shouldShowLineNumbers = context.showLineNumbers

  // Handle toggling of line numbers in markdown
  if (language.includes('no-line-numbers')) {
    shouldShowLineNumbers = false
    language = language.replace('_no-line-numbers', '')
  } else if (language.includes('line-numbers')) {
    shouldShowLineNumbers = true
    language = language.replace('_line-numbers', '')
  }

  const langClass = `syntax-${language} ${shouldShowLineNumbers ? 'line-numbers' : 'no-line-numbers'}`

  const props = {
    language,
    useInlineStyles: context.theme !== undefined,
    style: context.theme,
    showLineNumbers: shouldShowLineNumbers,
    lineNumberStyle: { opacity: 0.3 },
    children: code,
    codeTagProps: {
      className: langClass,
    },
  }

  // if (context.highlighter === 'prism') {
  //   return <PrismHighlighter {...props} />
  // }

  return (
    <SyntaxHighlighter {...props} />
  )
}
