import React from 'react'
import { Link } from 'react-router-dom'
import {
  Wrapper,
  CustomLogo,
  GeneratedLogo,
} from './styles'

export default function (props) {
  return (
    <Wrapper>
      <Link to={props.url}>
        {props.logo
          ? <CustomLogo><img src={props.logo} /></CustomLogo>
          : <GeneratedLogo>{props.title}</GeneratedLogo>}
      </Link>
    </Wrapper>
  )
}
