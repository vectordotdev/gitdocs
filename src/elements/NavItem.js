import styled from 'styled-components'

export default styled.span`
  border-radius: 3px;
  padding: 7px 10px 7px 0;
  text-decoration: none;
  font-family: "source-sans-pro", sans-serif;
  font-size: 14px;
  color: #A6ACB7;
  letter-spacing: .1px;
  line-height: 16px;
  border: none;
  display: block;
  transition: all .2s ease-in-out;
  cursor: pointer;
  margin: .25rem 0;

  &:hover {
    background: #f5f7fb;
    color: #595b61;
    padding-left: 10px;
  }

  svg {
    height: 15px;
    width: 15px;
    margin-right: .25rem;
  }

  svg g {
    fill: #A6ACB7;
  }

  &.active {
    background: #5E58AE;
    font-weight: 600;
    color: #FFF;
    padding-left: 10px;

    svg g { fill: #FFF }
  }

  a {
    color: #A6ACB7;

    &:hover {
      color: #595b61;
    }
  }
`
