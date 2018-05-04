import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Markdown from 'markdown-to-jsx'
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
      this.socket = new WebSocket(this.props.socketUrl)

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
      title,
      content,
    } = this.state.route

    return (
      <div className={styles.wrapper}>
        <Helmet>
          <title>{title}</title>

          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css"
          />
        </Helmet>

        <div className={styles.body}>
          <div className="markdown-body">
            {content
              ? <Markdown>{content}</Markdown>
              : <Loading />}
          </div>
        </div>
      </div>
    )
  }
}
