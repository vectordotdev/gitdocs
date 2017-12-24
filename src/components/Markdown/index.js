import React, { PureComponent } from 'react'
import unified from 'unified'
import parse from 'remark-parse'
import rehype from 'remark-rehype'
import frontmatter from 'remark-frontmatter'
import raw from 'rehype-raw'
import slugify from 'rehype-slug'
import autolink from 'rehype-autolink-headings'
import collapse from 'remark-collapse'
import toc from 'remark-toc'
import reactify from './reactify'
import Wrapper from './Wrapper'
import CodeRenderer from './Code'
import PreRenderer from './Pre'
import IconRenderer from './Icon'
import LinkRenderer from './Link'
import TipRenderer from './Tip'
import InfoRenderer from './Info'
import WarningRenderer from './Warning'
import DangerRenderer from './Danger'
import HighlightRenderer from './Highlight'
import Mermaid from './Mermaid'
// import Contents from './Contents'

import reactParser from 'remark-jsx/parser'
import jsx from 'remark-jsx/toHast'

const makeComponents = options => ({
  a: LinkRenderer,
  i: IconRenderer,
  tip: TipRenderer,
  info: InfoRenderer,
  warning: WarningRenderer,
  danger: DangerRenderer,
  highlight: HighlightRenderer,
  code: CodeRenderer(options),
  pre: PreRenderer(options),
  mermaid: Mermaid,
})

const linkHAST = {
  type: 'element',
  tagName: 'i',
  properties: { className: 'link' },
}

function getFrontMatter () {
  return dir => console.log(dir.children.find(c => c.type === 'yaml'))
}


const makeProcessor = options => unified()
  .use(parse, {
    highlightLines: true,
    blockMethods: [
      'newline',
      'indentedCode',
      'fencedCode',
      'blockquote',
      'atxHeading',
      'thematicBreak',
      'list',
      'setextHeading',
      'html',
      'react',
      'footnote',
      'definition',
      'table',
      'paragraph',
    ]
  })
  .use(reactParser)
  .use(frontmatter, ['yaml'])
  .use(collapse, { test: 'collapse' })
  .use(toc)
  .use(rehype, { allowDangerousHTML: true })
  .use(jsx)
  .use(raw)
  .use(slugify)
  .use(autolink, { content: linkHAST })
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
    const processed = processor.processSync(source)

    // if (config.tableOfContents) {
    //   const toc = <Contents toc={content.toc} key="markdown-toc" />
    //   content.tree.unshift(toc)
    // }

    return (
      <Wrapper className="markdown">
        {processed.contents}
      </Wrapper>
    )
  }
}

export default Markdown
