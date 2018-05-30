import React from 'react'
import { ConfigContext } from '../context'
import Search from '../search'
import { Wrapper, Nav } from './styles'

export default function (props) {
  return (
    <ConfigContext.Consumer>
      {config =>
        <Wrapper>
          {!props.isSSR && <Search
            config={config}
            manifest={props.manifest}
          />}
          <Nav>
            {config.header_links.map(({ title, ...rest }) => (
              <a {...rest} key={`nav-${title}`}>{title}</a>
            ))}
          </Nav>
        </Wrapper>
      }
    </ConfigContext.Consumer>
  )
}
