import styled from 'react-emotion'

export const Wrapper = styled('header')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 30px;
  border-bottom: 1px solid #E6E9EB;
`

export const Nav = styled('nav')`
  flex-shrink: 0;
  a {
    display: inline-block;
    color: rgba(0, 0, 0, .5);
    padding: 4px 0;
    text-decoration: none;
    margin-left: 20px;
    :hover {
      border-bottom: 1px solid rgba(0, 0, 0, .1);
    }
  }
`
