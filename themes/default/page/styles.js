import styled from 'react-emotion'

export const Wrapper = styled('div')`
  padding: 30px 50px;
  max-width: 1024px;
  box-sizing: border-box;
  display: flex;

  @media(max-width: 1024px) {
    flex-direction: column-reverse;
    nav { margin-left: 0 }
  }

  @media(min-width: 1450px) {
    max-width: 1200px;
  }
`

export const TOC = styled('nav')`
  margin-left: 2rem;
  width: 150px;
  flex-grow: 0;

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
`
