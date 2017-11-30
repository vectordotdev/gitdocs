import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 15px;
  position: fixed;
  top: 15px;
  right: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #F9F9F9;

  @media(max-width: 1100px) {
    display: none;
  }

  h3 {
    text-transform: uppercase;
    color: #999999;
    margin: 0;
    font-size: 12px;
  }

  a {
    color: #444;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
    }
  }

  > ul, > ul > ul {
    padding-left: 0;
  }

  ul ul ul {
    padding-left: 10px;
  }
`

const Contents = ({ title, id, children, index = 0 }) => (
  <ul>
    <a
      style={{ fontWeight: index < 1 ? '600' : '400' }}
      href={`#${id}`}
    >
      {title}
    </a>
    {
      children &&
      children.map(c => (
        <Contents
          key={c.title}
          {...c}
          index={index + 1}
        />
      ))
    }
  </ul>
)

export default ({ toc }) => {
  if (!toc.length) return null

  return (
    <Wrapper>
      <h3>Outline</h3>
      {toc.map(t => <Contents key={t.title} {...t} />)}
    </Wrapper>
  )
}
