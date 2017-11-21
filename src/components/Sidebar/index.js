import React from 'react'
import { getRouteProps } from 'react-static'
import Notebook from 'svg/Notebook'
import Markdown from 'components/Markdown'
import SidebarItem from './SidebarItem'
import Wrapper from './Wrapper'
import Header from './Header'

const Sidebar = ({ tree, toc, doc, config }) => (console.log(config),
  <Wrapper>
    <Header>
      <a href={config.repository}>
        {config.name} version {config.version}
      </a>
    </Header>
    <ul>
      {toc && <Markdown source={toc.body} doc={doc} />}
      {!toc && tree.children.map(c =>
        <SidebarItem {...c} key={c.path} doc={doc} config={config} />
      )}
    </ul>
  </Wrapper>
)

export default getRouteProps(Sidebar)
