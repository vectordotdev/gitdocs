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

var attributeName = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
var unquoted = '[^"\'=<>`\\u0000-\\u0020]+';
var singleQuoted = '\'[^\']*\'';
var doubleQuoted = '"[^"]*"';
var reactObj = '\{\{.+\}\}';
var attributeValue = '(?:' + unquoted + '|' + singleQuoted + '|' + doubleQuoted + '|' + reactObj + ')';
var attribute = '(?:\\s+' + attributeName + '(?:\\s*=\\s*' + attributeValue + ')?)';
var openTag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';
var closeTag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var openCloseTag = new RegExp('^(?:' + openTag + '|' + closeTag + ')');
var C_TAB = '\t';
var C_SPACE = ' ';
var C_NEWLINE = '\n';
var C_LT = '<';

function blockReact(eat, value, silent) {
  var self = this;
  var blocks = self.options.blocks;
  var length = value.length;
  var index = 0;
  var next;
  var line;
  var offset;
  var character;
  var count;
  var sequence;
  var subvalue;

  var sequences = [
    [new RegExp(openCloseTag.source + '\\s*$'), /^$/, false]
  ];

  /* Eat initial spacing. */
  while (index < length) {
    character = value.charAt(index);

    if (character !== C_TAB && character !== C_SPACE) {
      break;
    }

    index++;
  }

  if (value.charAt(index) !== C_LT) {
    return;
  }

  next = value.indexOf(C_NEWLINE, index + 1);
  next = next === -1 ? length : next;
  line = value.slice(index, next);
  offset = -1;
  count = sequences.length;

  while (++offset < count) {
    if (sequences[offset][0].test(line)) {
      sequence = sequences[offset];
      break;
    }
  }

  if (!sequence) {
    return;
  }

  if (silent) {
    return sequence[2];
  }

  index = next;

  if (!sequence[1].test(line)) {
    while (index < length) {
      next = value.indexOf(C_NEWLINE, index + 1);
      next = next === -1 ? length : next;
      line = value.slice(index + 1, next);

      if (sequence[1].test(line)) {
        if (line) {
          index = next;
        }

        break;
      }

      index = next;
    }
  }

  subvalue = value.slice(0, index);

  return eat(subvalue)({type: 'html', value: subvalue});
}

function reactParser() {
  var Parser = this.Parser;
  var tokenizers = Parser.prototype.blockTokenizers;
  var methods = Parser.prototype.blockMethods;

  /* Add an inline tokenizer (defined in the following example). */
  tokenizers.react = blockReact;

  /* Run it just before `footnote`. */
  methods.splice(methods.indexOf('footnote'), 0, 'react');
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
  .use(getFrontMatter)
  .use(collapse, { test: 'collapse' })
  .use(toc)
  .use(rehype, { allowDangerousHTML: true })
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
