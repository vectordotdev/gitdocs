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
  top: 65px;
  height: 50vh;
  max-width: 700px;
  max-height: 700px;
  overflow: scroll;
  border: 1px solid rgba(0,0,0,.1);
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,.175);
  background: #FFF;
  z-index: 99;
`

export const Result = styled('div')`
  padding: .5rem 1rem;
  background: ${props => props.selected ? '#f7f7fb' : '#FFF'};
  a { text-decoration: none }
  &:hover {
    h5 { color: #6457DC; text-decoration: underline; }
  }
  h5 {
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
    font-size: .9rem;
  }
  p .highlight {
    // text-decoration: underline;
    // text-decoration-color: #d1ccec
    border-bottom: 2px solid #b1a9da;
    display: inline-block;
    background: transparent;
  }
  .url {
    font-size: 12px;
    color: #5343a2;
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
