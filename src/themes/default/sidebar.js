import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Navigation from '../navigation'

export const Wrapper = styled.div`
  position: fixed;
  top: 30px;
  bottom: 30px;
  overflow: auto;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #DDDDDD;
  text-align: left;
`

export const Logo = styled(Link)`
  margin: 50px 0;
  font-size: 20px;
  text-decoration: none;
  img {
    max-width: 100px;
  }
`

export const Nav = styled.ul`
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0 0 0 15px;
`

export const NavItem = styled.li`

`

export const Callout = styled.div`
  background: gray;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  text-align: center;
  font-size: 10px;
  color: lightgray;
`

export default function (props) {
  // const logo = props.logo
  //   ? <img src={require(`docs/${props.logo}`)} />
  //   : props.name

  return (
    <Wrapper>
      <Logo to="/">{props.name}</Logo>

      <Navigation
        items={props.links}
        componentNav={Nav}
        componentNavItem={NavItem}
      />

      <Callout>Built with GitDocs</Callout>
    </Wrapper>
  )
}
