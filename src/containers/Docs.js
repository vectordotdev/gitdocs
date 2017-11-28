import React from 'react'
import styled from 'styled-components'
import { getSiteProps, getRouteProps } from 'react-static'
import Markdown from 'components/Markdown'
import Doc from 'components/Doc'
import GitHub from 'svg/GitHub'

const Footer = styled.div`
  padding: 1rem 0;
  a {
    display: flex;
    align-items: center;
  }
  svg {
    height: 20px;
    width: 20px;
    margin-right: .5rem;
  }
`

const page = ({ doc, config }) => (
  <Doc>
    <Markdown source={doc.body} />
    <Footer>
      {
        config.repository &&
        <a href={`${config.repository}/blob/master/${doc.file}`}>
          <GitHub /> Edit this page
        </a>
      }
    </Footer>
  </Doc>
)

export default getSiteProps(getRouteProps(page))
