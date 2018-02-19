import React from 'react'
import { withRouteData } from 'react-static'
import Markdown from 'components/Markdown'
import SidebarItem from './SidebarItem'
import Wrapper from './Wrapper'
import Header from './Header'

const Sidebar = ({ tree, toc, doc, config, sidebarIsOpen }) => (
  <Wrapper sidebarIsOpen={sidebarIsOpen} className="sidebar" position={config.sidebar.position}>
    <Header>
      <a href={config.repository}>
        {config.name} version {config.version}
      </a>
    </Header>
    <ul>
      {toc && <Markdown source={toc.body} doc={doc} />}
      {!toc && tree.map(c => <SidebarItem {...c} key={c.path} doc={doc} config={config} />)}
    </ul>
  </Wrapper>
)

export default withRouteData(Sidebar)
