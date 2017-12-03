import React, { PureComponent } from 'react'
import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import raw from 'rehype-raw'
import slugify from 'rehype-slug'
import autolink from 'rehype-autolink-headings'
import reactify from 'rehype-react'
import toc from 'remark-toc'
import Wrapper from './Wrapper'
import CodeRenderer from './Code'
import IconRenderer from './Icon'
import LinkRenderer from './Link'
import TipRenderer from './Tip'
import InfoRenderer from './Info'
import WarningRenderer from './Warning'
import DangerRenderer from './Danger'
import HighlightRenderer from './Highlight'
import Contents from './Contents'

const makeComponents = options =>  ({
  a: LinkRenderer,
  i: IconRenderer,
  tip: TipRenderer,
  info: InfoRenderer,
  warning: WarningRenderer,
  danger: DangerRenderer,
  highlight: HighlightRenderer,
  code: CodeRenderer(options),
})

const tree = {
  type: 'element',
  tagName: 'i',
  properties: { className: 'link' },
}

const makeProcessor = options => unified()
  .use(remarkParse)
  .use(toc)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(raw)
  .use(slugify)
  .use(autolink, { content: tree })
  .use(reactify, {
    createElement: React.createElement,
    components: makeComponents(options),
  })

class Markdown extends PureComponent {
  render () {
    const { source, config = {} } = this.props

    const options = {
      showLineNumbers: config.showLineNumbers,
      highlighter: config.highlighter,
      theme: config.theme,
    }

    const processor = makeProcessor(options)
    const processed = processor.processSync(source).contents

    // if (config.tableOfContents) {
    //   const toc = <Contents toc={content.toc} key="markdown-toc" />
    //   content.tree.unshift(toc)
    // }

    return (
      <Wrapper className="markdown">
        {processed}
      </Wrapper>
    )
  }
}

export default Markdown
