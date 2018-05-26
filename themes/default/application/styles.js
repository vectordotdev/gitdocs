import styled, { css } from 'react-emotion'
import ui from '@timberio/ui'

ui.normalize()

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
  font-family: 'Menlo', monospace;
  line-height: 1;
  font-size: 1.1rem;
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
  border-right: 1px solid #E6E9EB;
  text-align: right;
  overflow: auto;

  @media (min-width: 850px) {
    min-width: 270px;
    max-width: 270px;
  }

  @media (min-width: 1440px) {
    min-width: initial;
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
`
