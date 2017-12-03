import React, { PureComponent, createElement } from 'react'
import marksy from 'marksy/components'
import Wrapper from './Wrapper'
import CodeRenderer from './Code'
import IconRenderer from './Icon'
import LinkRenderer from './Link'
import H1Renderer from './H1'
import H2Renderer from './H2'
import H3Renderer from './H3'
import TipRenderer from './Tip'
import InfoRenderer from './Info'
import WarningRenderer from './Warning'
import DangerRenderer from './Danger'
import HighlightRenderer from './Highlight'
import Contents from './Contents'

const compile = marksy({
  createElement,
  elements: {
    i: IconRenderer,
    a: LinkRenderer,
    h1: H1Renderer,
    h2: H2Renderer,
    h3: H3Renderer,
    code: CodeRenderer,
  },
  components: {
    Tip: TipRenderer,
    Info: InfoRenderer,
    Warning: WarningRenderer,
    Danger: DangerRenderer,
    Highlight: HighlightRenderer,
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
