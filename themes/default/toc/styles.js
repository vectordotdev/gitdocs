import styled, { css } from 'react-emotion'
import { Link } from 'react-router-dom'

export const Wrapper = styled('nav')`
  margin: 60px 0 0 5px;
  position: relative;
`

export const PageItem = styled('nav')`
  position: relative;
  margin: 0 0 30px 30px;
  width: 150px;

  ${props => props.sticky && css`
    @media (min-width: 1180px) {
      div {
        position: fixed;
        top: 30px;
      }
    }
  `}

  @media (max-width: 1180px) {
    width: 100%;
  }

  h5 {
    color: #848B8E;
    margin: 0 0 10px 0;
    opacity: .5;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    border-left: 1px solid #E6E9EB;
    padding-left: 20px;
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
  transition: opacity .1s;
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
