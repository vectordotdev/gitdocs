import styled from 'react-emotion'
import { Link } from 'react-router-dom'

export const Wrapper = styled('nav')`
  border-top: 1px solid #E6E9EB;
  margin-top: 60px;
  padding: 60px;
`

export const PageItem = styled('nav')`
  margin-left: 2rem;
  width: 150px;
  max-width: 150px;
  min-width: 150px;
  flex-grow: 0;

  @media (min-width: 1200px) {
    ul {
      position: ${props => props.sticky ? 'fixed' : 'initial'};
      top: 30px;
      right: 30px;
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

export const FolderItem = styled(Link)`
  display: inline-block;
  width: 230px;
  margin-right: 50px;
  margin-bottom: 70px;
  vertical-align: top;
  text-decoration: none;
  color: #4c555a;
  position: relative;
  font-size: .9rem;
  b {
    display: block;
    font-weight: 600;
    font-size: 1rem;
    color: #0d2b3e;
  }
  &:hover {
    opacity: .5;
  }
  &:before {
    content: "";
    width: 50px;
    height: 3px;
    background: #6457DF;
    position: absolute;
    top: -10px;
    left: 0;
    opacity: .3;
  }
`
