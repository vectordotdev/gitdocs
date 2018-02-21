import React from 'react'
import styled from 'styled-components'
//

const Wrapper = styled.div`padding: 1rem;`

export default () => (
  <Wrapper>
    <h1>
      404{' '}
      <span role="img" aria-label="sad-face">
        😔
      </span>
    </h1>
    <p>We couldn't find the page you're looking for.</p>
  </Wrapper>
)
