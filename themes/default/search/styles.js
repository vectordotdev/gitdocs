import styled, { css } from 'react-emotion'

export const Wrapper = styled('div')`
  flex: 1;
  display: flex;
  position: relative;
`

export const Input = styled('input')`
  outline: none;
  font-size: .9rem;
  padding: 8px 15px;
  border: 1px solid #E6E9EB;
  border-radius: 30px;
  display: block;
  flex: 1;
  ::placeholder {
    color: #ACB0B2;
  }
`

export const Results = styled('div')`
  position: absolute;
  width: 100%;
  top: 75px;
  height: calc(100vh - 75px);
  background: #FFF;
`

export const Result = styled('div')`
  padding: 1rem;
  ${props => props.selected && css`
    background: #F7F8F9;
  `}
  :hover {
    background: #F7F8F9;
  }
  h2 {
    font-weight: bold;
    text-decoration: underline;
  }
  p {
    color: #333;
    text-decoration: none;
  }
`
