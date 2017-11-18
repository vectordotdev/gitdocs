import React from 'react'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'

const Wrapper = styled.aside`
  flex: 1 0 auto;
  max-width: 250px;
  background: #FAFAFA;
`

export default ({ tree }) => (
  <Wrapper>
    <ul>
      {tree.children.map(c => <SidebarItem {...c} key={c.path} />)}
    </ul>
  </Wrapper>
)
