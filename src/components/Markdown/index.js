import React, { PureComponent } from 'react'
import Smackdown from 'react-smackdown'

import Danger from './Danger'
import Highlight from './Highlight'
import Icon from './Icon'
import Info from './Info'
import Link from './Link'
import Mermaid from './Mermaid'
import Tip from './Tip'
import Warning from './Warning'
import Wrapper from './Wrapper'

const configSyntax = JSON.parse(process.env.GITDOCS_SYNTAX)

let theme
const languages = []

if (configSyntax.theme) {
  if (configSyntax.highlighter === 'prism') {
    theme = require(`react-syntax-highlighter/dist/styles/prism/${configSyntax.theme // eslint-disable-line
    }`).default
  } else if (configSyntax.highlighter === 'hljs') {
    theme = require(`react-syntax-highlighter/dist/styles/hljs/${configSyntax.theme // eslint-disable-line
    }`).default
  } else {
    console.warn(`Unsupported highlighter option was found: ${configSyntax.highlighter}`)
  }
}

if (configSyntax.languages) {
  configSyntax.languages.forEach(name =>
    languages.push({
      name,
      syntax: require(`react-syntax-highlighter/dist/languages/${configSyntax.highlighter}/${name // eslint-disable-line
      }`).default,
    }),
  )
}

const renderers = {
  a: Link,
  i: Icon,
  tip: Tip,
  info: Info,
  warning: Warning,
  danger: Danger,
  highlight: Highlight,
  mermaid: Mermaid,
  react: props => <strong>{props.children}</strong>,
}

class Markdown extends PureComponent {
  render () {
    const { source, config = {} } = this.props

    const syntax = {
      ...config.syntax,
      languages,
      theme,
      lineNumberStyle: { opacity: 0.5 },
    }

    return (
      <Wrapper className="smackdown">
        <Smackdown source={source} syntax={syntax} renderers={renderers} />
      </Wrapper>
    )
  }
}

export default Markdown
