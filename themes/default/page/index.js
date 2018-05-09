import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Markdown from '../markdown'
import Loading from '../loading'
import { ConfigContext } from '../context'
import styles from './styles'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      route: props.route,
    }
  }

  componentDidMount () {
    if (process.env.NODE_ENV === 'development') {
      this._socket = new WebSocket(this.props.socketUrl)

      this._socket.addEventListener('open', evt => {
        const payload = JSON.stringify(this.props.route)
        this._socket.send(payload)
      })

      this._socket.addEventListener('message', evt => {
        const payload = JSON.parse(evt.data)
        this.setState({ route: payload })
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
      title,
      content,
    } = this.state.route

    return (
      <ConfigContext.Consumer>
        {config =>
          <div className={styles.wrapper}>
            <Helmet>
              <title>{title}</title>
            </Helmet>

            <div>
              {content
                ? (
                  <Markdown
                    source={content}
                    lineNumbers={config.theme_custom.syntaxLineNumbers}
                  />
                )
                : <Loading />}
            </div>
          </div>
        }
      </ConfigContext.Consumer>
    )
  }
}
