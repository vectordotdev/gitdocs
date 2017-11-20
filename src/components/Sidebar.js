import React from 'react'
import { getRouteProps } from 'react-static'
import styled from 'styled-components'
import Markdown from 'components/Markdown'
import SidebarItem from './SidebarItem'

const Wrapper = styled.aside`
  flex: 1 0 auto;
  min-width: 230px;
  max-width: 230px;
  background: #f4f7fa;
  padding: 1.5rem;
  overflow-y: auto;
  border-right: 1px solid #DFE3E8;
  margin: 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
  }

  ul ul {
    padding-left: 15px;
  }

  ul li {
    margin-bottom: .75rem;
  }

  li > ul {
    margin-top: .5rem;
    margin-bottom: 0;
  }

  li > a {
    text-decoration: none;
    color: #404e5c;
    font-size: 1rem;
    line-height: 1.5;
    display: block;

    &.active {
      color: #4688F1;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3 {
    text-transform: uppercase;
    letter-spacing: .05em;
    color: #919eab;
    font-weight: 700;
    font-size: .75rem;

    a { text-decoration: none }
  }
`

const Sidebar = ({ tree, toc, doc }) => (
  <Wrapper>
    <ul>
      {toc && <Markdown source={toc.body} />}
      {!toc && tree.children.map(c =>
        <SidebarItem {...c} key={c.path} doc={doc} />
      )}
    </ul>
  </Wrapper>
)

export default getRouteProps(Sidebar)
