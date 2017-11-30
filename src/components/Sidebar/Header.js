import styled from 'styled-components'

export default styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #DFE3E8;
  padding: 1rem 1.5rem;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: #919eab;
  font-weight: 700;
  font-size: .75rem;
  a { color: inherit }

  @media (min-width: 1500px) {
    border-bottom: none;
  }
`
