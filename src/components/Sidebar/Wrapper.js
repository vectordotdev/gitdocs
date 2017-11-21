import styled from 'styled-components'

export default styled.aside`
  flex: 1 0 auto;
  min-width: 230px;
  max-width: 280px;
  background: #f4f7fa;
  overflow-y: auto;
  border-right: 1px solid #DFE3E8;
  margin: 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
  }

  > ul {
    padding: .5rem 1.5rem 1.5rem 1.5rem;
  }

  ul ul {
    padding-left: 15px;
  }

  ul li {
    margin-bottom: .75rem;
  }

  li > ul {
    margin-top: .5rem;
    margin-bottom: 0;
  }

  li > a {
    text-decoration: none;
    color: #404e5c;
    font-size: 1rem;
    line-height: 1.5;
    display: block;

    &.active {
      color: #4688F1;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3 {
    text-transform: uppercase;
    letter-spacing: .05em;
    color: #919eab;
    font-weight: 700;
    font-size: .75rem;

    a { text-decoration: none }
  }
`
