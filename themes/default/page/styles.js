import styled from 'react-emotion'

export const Wrapper = styled('div')`
  padding: 30px 50px;
  box-sizing: border-box;
  display: flex;

  @media(max-width: 1200px) {
    flex-direction: column-reverse;
    nav { margin-left: 0 }
    padding: 15px 50px;
  }

  @media(max-width: 500px) {
    padding: 10px 20px;
  }

  @media(min-width: 1450px) {
    max-width: 1200px;
  }
`

export const TOC = styled('nav')`
  margin-left: 2rem;
  width: 150px;
  max-width: 150px;
  min-width: 150px;
  flex-grow: 0;

  @media (min-width: 1200px) {
    ul {
      position: ${props => props.sticky ? 'fixed' : 'initial'};
      top: 30px;
    }
  }

  ul {
    list-style: none;
    border-left: 1px solid #E6E9EB;
    padding-left: 2rem;
  }

  h5 {
    color: #848B8E;
    margin: 0;
  }

  li {
    font-size: 13px;
    line-height: 30px;
    display: block;
  }

  a {
    text-decoration: none;
    color: #626469;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    &:hover {
      color: #5742C7;
    }
  }
`

export const ContentWrapper = styled('div')`
  padding: 0 50px;

  @media(min-width: 1450px) {
    max-width: 850px;
  }

  @media(max-width: 1200px) {
    padding: 0 50px 0 0;
  }

  @media(max-width: 600px) {
    padding: 0;
  }
`
