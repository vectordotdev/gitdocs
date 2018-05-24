import React from 'react'
import { ConfigContext } from '../context'
// import Search from '../search'
import { Wrapper, Nav } from './styles'

export default function (props) {
  return (
    <ConfigContext.Consumer>
      {config =>
        <Wrapper>
          {/* <Search
            config={config}
            manifest={props.manifest}
          /> */}

          <Nav>
            {config.header_links.map(({ text, ...rest }) => (
              <a {...rest} key={`nav-${text}`}>{text}</a>
            ))}
          </Nav>
        </Wrapper>
      }
    </ConfigContext.Consumer>
  )
}

// const logo = props.logo
//   ? <img src={require(`docs/${props.logo}`)} />
//   : props.name
