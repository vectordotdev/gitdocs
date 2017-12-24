import merge from 'lodash.merge'
import mermaid, { mermaidAPI } from 'mermaid'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  width: ${props => props.width}px;
  ${props => (props.height ? css`height: ${props.height}px;` : '')}
  > svg {
    height: 100%;
    width: 100%;
  }
`

class Mermaid extends Component {
  state = {
    diagram: '',
  }

  componentDidMount () {
    const { children, config, height, width } = this.props
    const defaultConfig = {
      // If this is true, mermaid tries to re-render
      // using window.addEventListener('loaded', ...)
      // which screws it all up.
      startOnLoad: false,
      gantt: {
        useWidth: width,
        useHeight: height || null,
      },
    }
    const mermaidConfig = merge(defaultConfig, config)
    mermaidAPI.initialize(mermaidConfig)

    const doc = children.toString().trim()
    const diagram = mermaidAPI.render(doc)
    this.setState({
      diagram,
    })
  }

  render () {
    const { height, width } = this.props
    const { diagram } = this.state
    return (
      <Wrapper
        dangerouslySetInnerHTML={{ __html: diagram }}
        height={height}
        width={width}
      />
    )
  }
}

Mermaid.propsTypes = {
  config: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
}

Mermaid.defaultProps = {
  config: {},
  height: null,
  width: 800,
}

export default Mermaid
