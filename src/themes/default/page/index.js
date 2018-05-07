import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Markdown from '../../markdown'
import Loading from '../loading'
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
      const { host, port } = this.props.config
      this.socket = new WebSocket(`ws://${host}:${port}`)

      this.socket.addEventListener('open', evt => {
        this.socket.send(
          JSON.stringify(this.props.route)
        )
      })

      this.socket.addEventListener('message', evt => {
        this.setState({
          route: JSON.parse(evt.data),
        })
      })
    }
  }

  componentWillUnmount () {
    if (this.socket) {
      this.socket.close()
    }
  }

  render () {
    const {
      config,
    } = this.props

    const {
      title,
      content,
    } = this.state.route

    return (
      <div className={styles.wrapper}>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <div>
          {content
            ? <Markdown source={content} languages={config.languages} />
            : <Loading />}
        </div>
      </div>
    )
  }
}
