import React, { Component } from 'react'
import Helmet from 'react-helmet'
import axios from 'axios'
import Markdown from '../markdown'
import Loading from '../loading'
import { ConfigContext } from '../context'
import { Wrapper } from './styles'

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
    if (process.env.NODE_ENV === 'development') {
      this._socket = new WebSocket(this.props.socketUrl)

      this._socket.addEventListener('open', evt => {
        this._socket.send(this.props.route.input)
        this.setState({ loading: true })
      })

      this._socket.addEventListener('message', evt => {
        this.setState({
          content: evt.data,
          loading: false,
        })
      })
    } else {
      const { data } = await axios.get('index.json')
      this.setState({ // eslint-disable-line
        content: data.content,
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
    } = this.state

    const defaultContent = '##### _You don\'t have any content here yet!_'

    return (
      <ConfigContext.Consumer>
        {config =>
          <Wrapper>
            <Helmet>
              <title>{route.title}</title>
            </Helmet>

            <div>
              {loading
                ? <Loading />
                : (
                  <Markdown
                    source={content || defaultContent}
                    {...config.syntax}
                  />
                )}
            </div>
          </Wrapper>
        }
      </ConfigContext.Consumer>
    )
  }
}
