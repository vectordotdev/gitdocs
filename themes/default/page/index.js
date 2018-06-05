import React, { Component } from 'react'
import Helmet from 'react-helmet'
import axios from 'axios'
import Markdown from '../markdown'
import Breadcrumbs from '../breadcrumbs'
import Loading from '../loading'
import TocPage from '../toc/page'
import TocFolder from '../toc/folder'
import { ConfigContext } from '../context'
import { Wrapper, ContentWrapper, MarkdownWrapper } from './styles'

const Content = ({ content, config, route }) => {
  const defaultContent = '##### _You don\'t have any content here yet!_'

  // Prepend route title to content if `prependTitles` is set to true in config
  let md = content
  if (config.prefix_titles) {
    md = `# ${route.title} \n ${content}`
  }

  return (
    <MarkdownWrapper>
      <Markdown
        source={md || defaultContent}
        {...config.syntax}
      />
    </MarkdownWrapper>
  )
}

export default class Page extends Component {
  static displayName = 'Page'

  constructor (props) {
    super(props)
    this.state = {
      loading: !props.route.content,
      content: props.route.content,
    }
  }

  async componentDidMount () {
    const { socketUrl } = this.props.pageData

    if (process.env.NODE_ENV === 'development') {
      this._socket = new WebSocket(socketUrl)

      this._socket.addEventListener('open', evt => {
        this._socket.send(this.props.route.input)
        this.setState({ loading: true })
      })

      this._socket.addEventListener('message', evt => {
        const { content } = JSON.parse(evt.data)
        this.setState({ content, loading: false })
      })
    } else if (!this.state.content) {
      try {
        const {
          data: { content },
        } = await axios.get('index.json')
        this.setState({ content, loading: false })
      } catch (err) {
        console.error(`Could not get page content: ${err}`)
      }
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
      pageData: { sticky },
    } = this.props

    const {
      loading,
      content,
    } = this.state

    return (
      <ConfigContext.Consumer>
        {config =>
          <Wrapper>
            <Helmet>
              {config.name !== route.title &&
                <title>{route.title}</title>}
            </Helmet>

            {Array.isArray(route.breadcrumbs) &&
              <Breadcrumbs items={route.breadcrumbs} />}

            {loading
              ? <Loading />
              : (
                <div>
                  <ContentWrapper>
                    <Content
                      content={content}
                      config={config}
                      route={route}
                    />

                    {route.toc.page &&
                      <TocPage items={route.toc.page} sticky={sticky} />}
                  </ContentWrapper>

                  {route.toc.folder &&
                    <TocFolder items={route.toc.folder} />}
                </div>
              )}
          </Wrapper>
        }
      </ConfigContext.Consumer>
    )
  }
}
