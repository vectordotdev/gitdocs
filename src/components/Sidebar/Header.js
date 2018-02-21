import styled, { css } from 'styled-components'

export default styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dfe3e8;
  padding: 1.1rem 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #919eab;
  font-weight: 700;
  font-size: 0.75rem;
  a {
    color: #4d6987;
  }

  ${props => props.position === 'left' && css`padding-right: 50px;`};

  @media (min-width: 1500px) {
    border-bottom: none;
  }
`
