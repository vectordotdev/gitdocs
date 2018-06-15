import { normalize } from '@timberio/ui'
import styled, { css } from 'react-emotion'

normalize()

const fontMain = css`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.1rem;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.85);
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
`

const fontMono = css`
  font-family: "Menlo", "Source Code Pro", "Inconsolata","monospace", serif;
  font-size: 13px;
  line-height: 21px;
`

export const Wrapper = styled('div')`
  display: flex;
  height: 100vh;
  @media (max-width: 850px) {
    flex-direction: column;
  }
  &, input {
    ${fontMain};
  }
  * pre, code {
    ${fontMono};
  }
`

export const WrapperNav = styled('nav')`
  flex: 1;
  background: linear-gradient(90deg, #F0F2F4 0%, #F5F7F9 100%);
  background: #FAFAFD;
  border-right: 1px solid #E6E9EB;
  box-shadow: inset -4px 0px 2px -2px rgba(202, 209, 226, 0.2);
  text-align: right;
  overflow: auto;

  @media (min-width: 850px) {
    min-width: 270px;
    max-width: 270px;
  }

  @media (min-width: 1480px) {
    max-width: initial;
  }

  @media (max-width: 850px) {
    flex: 0 auto;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
  }
`

export const WrapperPage = styled('div')`
  flex: 2;
  overflow: auto;
  position: relative;
  @media (max-width: 500px) {
    max-width: 100%;
  }
`
