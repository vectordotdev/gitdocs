import React, { PureComponent, createElement } from 'react'
import marksy from 'marksy/components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import PrismHighlighter from 'react-syntax-highlighter/prism'
import Wrapper from './Wrapper'
import IconRenderer from './Icon'
import LinkRenderer from './Link'
import H1Renderer from './H1'
import H2Renderer from './H2'
import H3Renderer from './H3'
import TipRenderer from './Tip'
import InfoRenderer from './Info'
import WarningRenderer from './Warning'
import DangerRenderer from './Danger'
import Contents from './Contents'

const CodeRenderer = ({ code, language, children, context }) => {
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
    // style: context.theme ? themes[context.theme] : '',
    codeTagProps: {
      className: langClass,
    },
  }

  if (context.highlighter === 'prism') {
    return <PrismHighlighter {...props} />
  }

  return (
    <SyntaxHighlighter {...props} />
  )
}

const compile = marksy({
  createElement,
  elements: {
    i: IconRenderer,
    a: LinkRenderer,
    h1: H1Renderer,
    h2: H2Renderer,
    h3: H3Renderer,
    code: CodeRenderer,
    pre: CodeRenderer,
  },
  components: {
    Tip: TipRenderer,
    Info: InfoRenderer,
    Warning: WarningRenderer,
    Danger: DangerRenderer,
  },
})

class Markdown extends PureComponent {
  render () {
    const { source, config = {} } = this.props
    const content = compile(source, null, {
      showLineNumbers: config.showLineNumbers,
      highlighter: config.highlighter,
      theme: config.theme,
    })

    console.log(config.theme)

    if (config.tableOfContents) {
      const toc = <Contents toc={content.toc} key="markdown-toc" />
      content.tree.unshift(toc)
    }

    return (
      <Wrapper className="markdown">
        {content.tree}
      </Wrapper>
    )
  }
}

export default Markdown
