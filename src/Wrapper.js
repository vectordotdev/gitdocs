import styled, { css } from 'styled-components'

export default styled.main`
  position: relative;
  transition: all 0.2s ease-out;
  margin: 0 auto;

  > section {
    max-width: 800px;
    margin: 0 auto;
  }

  @media (min-width: 700px) and (max-width: 1499px) {
    ${props => props.sidebarIsOpen && css`padding-left: 280px;`};
  }

  @media (min-width: 1500px) {
    padding-left: 280px;
    max-width: 1200px;

    > section {
      max-width: 920px;
    }
  }
`
