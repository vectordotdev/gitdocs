import styled from 'react-emotion'

export const Wrapper = styled('div')`
  flex: 1;
  display: flex;
  position: relative;
  align-items: center;
`

export const Input = styled('input')`
  outline: none;
  font-size: .9rem;
  padding: 8px 15px;
  display: block;
  width: 200px;
  border: none;
  flex-grow: 1;
  ::placeholder {
    color: #ACB0B2;
  }
`

export const Results = styled('div')`
  position: absolute;
  width: 100%;
  top: 70px;
  height: 50vh;
  max-height: 700px;
  overflow: scroll;
  box-shadow: 0 1px 5px 0 rgba(0,0,0,.07), 0 7px 17px 0 rgba(0,0,0,.1);
  background: #FFF;
  z-index: 99;
`

export const Result = styled('div')`
  padding: 1rem;
  background: ${props => props.selected ? '#f6f5fb' : '#FFF'};
  a { text-decoration: none }
  &:hover {
    background: #f6f5fb;
    h4 { color: #6457DC; text-decoration: underline; }
  }
  h4 {
    font-weight: bold;
    text-decoration: none;
    margin: 0;
    color: ${props => props.selected ? '#6457DC' : '#0d2b3e'};
    text-decoration: ${props => props.selected ? 'underline' : 'none'};
  }
  p {
    color: rgba(0,0,0,0.75);
    text-decoration: none;
    margin: 0;
    font-size: 1rem;
  }
  p .highlight { background: #d1ccec }
  .url {
    font-size: 12px;
  }
`

export const Center = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
