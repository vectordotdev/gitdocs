import React from 'react'
import styled, { css } from 'styled-components'
import Hamburger from 'svg/Hamburger'

const Wrapper = styled.div`
  position: absolute;
  height: 35px;
  width: 35px;
  border: 1px solid #ddd;
  background: white;
  margin: 6px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease-out;

  ${props => (props.position === 'right' ? css`right: 100%;` : css`left: 100%;`)};

  ${props =>
    props.position === 'left' && props.sidebarIsOpen && css`transform: translateX(-47px);`};

  &:hover svg g {
    stroke: #4688f1;
  }

  @media (min-width: 1500px) {
    opacity: 0;
    pointer-events: none;
  }
`

export default props => (
  <Wrapper {...props}>
    <Hamburger />
  </Wrapper>
)
