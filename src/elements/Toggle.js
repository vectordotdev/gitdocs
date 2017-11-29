import React from 'react'
import styled from 'styled-components'
import Hamburger from 'svg/Hamburger'

const Wrapper = styled.div`
  height: 35px;
  width: 35px;
  border: 1px solid #ddd;
  position: relative;
  top: 15px;
  left: 15px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default ({ onClick }) => (
  <Wrapper onClick={onClick}>
    <Hamburger />
  </Wrapper>
)
