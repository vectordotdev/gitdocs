import styled from 'styled-components'

export default styled.section`
  color: rgba(0,0,0,.7);
  line-height: 1.75;
  padding: 1rem 2rem;
  font-family: "source-sans-pro", sans-serif;
  font-size: 1.1rem;
  word-wrap: break-word;
  flex: 1 1 auto;
  overflow-y: scroll;

  .header {
    display: block;
    font-family: "source-sans-pro", sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #3D4A67;
    letter-spacing: .11px;
    text-decoration: none;
    border-bottom: 1px solid #dde1eb;
    padding: .5rem 0;
    margin: .5rem 0;
  }

  .link {
    font-size: 15px;
    display: block;
    padding: .2rem 0;

    &:hover {
      text-decoration: underline;
    }
  }

  .additions {
    background: #d8fbdb;
    border-radius: 5px;
    color: #1d8745;
    padding: 0.75em 1em;
    margin-bottom: 1em;
    font-size: 85%;

    h3 {
      margin: 0 0 1em 0;
    }

    .learn-more {
      display: block;
      font-size: 80%;
    }

    > p:last-child {
      margin-bottom: 0
    }

    ol,
    ul {
      margin: 0.5em 0;
      padding: 0 0 0 2px;
      list-style: none;
      color: #1d8745;

      li {
        margin: 0;
        padding: 0;
      }
    }
  }
`
