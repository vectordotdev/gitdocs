import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

export const Callout = styled.div`
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  text-align: center;
  font-size: 10px;
  color: lightgray;
`

function navItems (items, lvl = 0) {
  return (
    <ul style={{ marginLeft: `${lvl * 15}px` }}>
      {items.map(item => (
        <li key={`nav-${item.link}`}>
          {item.link
            ? <Link to={item.link}>{item.text}</Link>
            : item.text}

          {item.children &&
            navItems(item.children, lvl + 1)}
        </li>
      ))}
    </ul>
  )
}

export default function (props) {
  // const logo = props.logo
  //   ? <img src={require(`docs/${props.logo}`)} />
  //   : props.name

  return (
    <Wrapper>
      <Logo to="/">{props.name}</Logo>

      {navItems(props.links)}

      <Callout>Built with GitDocs</Callout>
    </Wrapper>
  )
}
