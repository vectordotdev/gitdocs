import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Markdown from '../markdown'
import Loading from '../loading'
import { ConfigContext } from '../context'
import { Wrapper } from './styles'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: Boolean(props.route.content),
      route: props.route,
    }
  }

  componentDidMount () {
    if (process.env.NODE_ENV === 'development') {
      this._socket = new WebSocket(this.props.socketUrl)

      this._socket.addEventListener('open', evt => {
        const payload = JSON.stringify(this.props.route)
        this._socket.send(payload)

        this.setState({ loading: true })
      })

      this._socket.addEventListener('message', evt => {
        const payload = JSON.parse(evt.data)

        this.setState({ route: payload, loading: false })
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
      loading,
      route: {
        title,
        content,
      },
    } = this.state

    const defaultContent = '###### _You don\'t have any content here yet!_'

    return (
      <ConfigContext.Consumer>
        {config =>
          <Wrapper>
            <Helmet>
              <title>{title}</title>
            </Helmet>

            <div>
              {loading
                ? <Loading />
                : (
                  <Markdown
                    source={content || defaultContent}
                    lineNumbers={config.theme_custom.syntaxLineNumbers}
                  />
                )}
            </div>
          </Wrapper>
        }
      </ConfigContext.Consumer>
    )
  }
}
