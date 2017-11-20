import React from 'react'
import Smackdown from 'react-smackdown'
import {
  javascript,
  ruby,
  elixir,
  shell,
  json,
  sql,
  yaml,
  ini,
  bash,
  diff,
} from 'react-syntax-highlighter/dist/languages'
import { atomOneLight } from 'react-syntax-highlighter/dist/styles'
import Wrapper from './Wrapper'
import IconRenderer from './Icon'
import LinkRenderer from './Link'
import H1Renderer from './H1'
import H2Renderer from './H2'
import H3Renderer from './H3'

const syntax = {
  languages: [
    { name: 'js', syntax: javascript },
    { name: 'ruby', syntax: ruby },
    { name: 'elixir', syntax: elixir },
    { name: 'shell', syntax: shell },
    { name: 'json', syntax: json },
    { name: 'sql', syntax: sql },
    { name: 'yaml', syntax: yaml },
    { name: 'ini', syntax: ini },
    { name: 'bash', syntax: bash },
    { name: 'diff', syntax: diff },
  ],
  showLineNumbers: true,
  lineNumberStyle: { opacity: 0.5 },
  theme: atomOneLight,
}

const Markdown = ({ source }) => {
  const content = (
    <Smackdown
      syntax={syntax}
      source={source}
      components={{
        i: IconRenderer,
        a: LinkRenderer,
        h1: H1Renderer,
        h2: H2Renderer,
        h3: H3Renderer,
      }}
    />
  )

  return (
    <Wrapper className="markdown" key="md-remark">
      {content}
    </Wrapper>
  )
}

export default Markdown
