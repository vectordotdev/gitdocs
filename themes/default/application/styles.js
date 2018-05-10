import styled, { css, injectGlobal } from 'react-emotion'
import normalize from 'emotion-normalize'

injectGlobal`
  ${normalize}
`

const fontMain = css`
  font-family: "Overpass", sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 1;
`

const fontMono = css`
  font-family: "Overpass Mono", monospace;
  font-weight: 300;
  font-size: 16px;
  line-height: 1;
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
  min-width: 250px;
  text-align: right;
  overflow: auto;
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
