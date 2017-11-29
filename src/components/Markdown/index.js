import React, { createElement } from 'react'
import marksy from 'marksy/components'
import Prism from 'prismjs'
import escapeHTML from 'escape-html'
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
require('prismjs/components/prism-jsx.js')

const compile = marksy({
  createElement,
  highlight: (language, code) => {
    console.log('local', Prism)
    if (!language) return escapeHTML(code)
    return Prism.highlight(code, Prism.languages[language], language)
  },
  elements: {
    i: IconRenderer,
    a: LinkRenderer,
    h1: H1Renderer,
    h2: H2Renderer,
    h3: H3Renderer,
  },
  components: {
    Tip: TipRenderer,
    Info: InfoRenderer,
    Warning: WarningRenderer,
    Danger: DangerRenderer,
  },
})

const Markdown = ({ source, ...rest }) => {
  const content = compile(source)
  console.log(content)

  return (
    <Wrapper className="markdown">
      {content.tree}
    </Wrapper>
  )
}

export default Markdown
