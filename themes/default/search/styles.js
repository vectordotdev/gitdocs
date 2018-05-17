import styled from 'react-emotion'

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
  z-index: 99;
`

export const Result = styled('div')`
  padding: .5rem;
  background: ${props => props.selected ? '#f6f5fb' : 'none'};
  :hover {
    background: #f6f5fb;
    h4 { color: #6457DC; }
  }
  h4 {
    font-weight: bold;
    text-decoration: underline;
    margin: 0;
    color: ${props => props.selected ? '#6457DC' : '#0d2b3e'};
  }
  p {
    color: rgba(0,0,0,0.85);
    text-decoration: none;
    margin: 0;
  }
`
