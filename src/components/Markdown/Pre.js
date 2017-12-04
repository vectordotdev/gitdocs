import React from 'react'
import cx from 'classnames'
import SyntaxHighlighter from 'react-syntax-highlighter'
import PrismHighlighter from 'react-syntax-highlighter/prism'

const getLanguage = className => {
  if (!className) return null
  return className.indexOf('-') ?
    className.split('-')[1]
    : null
}

export default options => ({ children, className }) => {
  // data-lines="1-3"
  // diff format
  const childProps = children[0].props
  const language = getLanguage(className || childProps.className)

  const { theme, highlighter, showLineNumbers } = options
  const isPrism = highlighter && highlighter.includes('prism')

  const wrapperClass = cx({
    [`syntax-${language}`]: true,
    [`language-${language}`]: true,
    'line-numbers': showLineNumbers,
    'no-line-numbers': !showLineNumbers,
  })

  // Kind of dirty, need to figure out how to get the code class on the Pre
  // tag through some kind of remark plugin or remark-parse extension
  const codeString = typeof children[0] === 'string'
    ? children.join('').trim() // html <pre>
    : children.map(c => c.props.children).join('') // markdown fenced block

  const langClass = cx({
    [`syntax-${language}`]: true,
    [`language-${language}`]: true,
  })

  console.log(options)

  const props = {
    language,
    useInlineStyles: theme !== undefined,
    style: theme,
    showLineNumbers,
    lineNumberStyle: { opacity: 0.3 },
    className: wrapperClass,
    children: codeString,
    PreTag: props => <pre className={wrapperClass} {...props} />,
    codeTagProps: {
      className: langClass,
    },
  }

  return isPrism
    ? <PrismHighlighter {...props} />
    : <SyntaxHighlighter {...props} />
}
