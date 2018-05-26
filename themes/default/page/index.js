import React, { Component } from 'react'
import Helmet from 'react-helmet'
import axios from 'axios'
import Markdown from '../markdown'
import Loading from '../loading'
import { ConfigContext } from '../context'
import { Wrapper, ContentWrapper, TOC } from './styles'

const TableOfContents = ({ toc }) => {
  // Don't show this if there aren't enough headers
  if (toc.length < 2) return null

  // Create TOC hierarchy and link to headers
  const items = toc.map(t => (
    <li
      key={`${toc}-${t.slug}`}
      style={{ marginLeft: (t.lvl - 2) * 10 }}
    >
      <a href={`#${t.slug}`}>
        {t.content}
      </a>
    </li>
  ))

  return (
    <TOC>
      <ul>
        <h5>Contents</h5>
        {items}
      </ul>
    </TOC>
  )
}

const Content = ({ content, config, route }) => {
  const defaultContent = '##### _You don\'t have any content here yet!_'

  // Prepend route title to content if `prependTitles` is set to true in config
  let md = content
  if (config.prefix_titles) {
    md = `# ${route.title} \n ${content}`
  }

  return (
    <ContentWrapper>
      <Markdown
        source={md || defaultContent}
        {...config.syntax}
      />
    </ContentWrapper>
  )
}

export default class Page extends Component {
  static displayName = 'Page'

  constructor (props) {
    super(props)
    this.state = {
      loading: !props.route.content,
      content: props.route.content,
      toc: props.route.toc,
    }
  }

  async componentDidMount () {
    if (process.env.NODE_ENV === 'development') {
      this._socket = new WebSocket(this.props.socketUrl)

      this._socket.addEventListener('open', evt => {
        this._socket.send(this.props.route.input)
        this.setState({ loading: true })
      })

      this._socket.addEventListener('message', evt => {
        const { content, toc } = JSON.parse(evt.data)
        this.setState({
          content,
          toc,
          loading: false,
        })
      })
    } else {
      const { data } = await axios.get('index.json')
      this.setState({ // eslint-disable-line
        content: data.content,
        toc: data.toc,
        loading: false,
      })
    }
  }

  componentWillUnmount () {
    if (this._socket) {
      this._socket.close()
    }
  }

  render () {
    const {
      route,
    } = this.props

    const {
      loading,
      content,
      toc,
    } = this.state

    return (
      <ConfigContext.Consumer>
        {config =>
          <Wrapper>
            <Helmet>
              <title>{route.title}</title>
            </Helmet>
            {
              loading &&
              <Loading />
            }
            {
              !loading &&
              <Content
                content={content}
                config={config}
                route={route}
              />
            }
            {
              !loading &&
              config.table_of_contents &&
              <TableOfContents toc={toc} />
            }
          </Wrapper>
        }
      </ConfigContext.Consumer>
    )
  }
}
