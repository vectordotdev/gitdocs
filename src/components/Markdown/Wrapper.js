import styled from 'styled-components'

export default styled.div`
  color: rgba(0,0,0,.7);
  line-height: 1.5;

  h1, h2, h3 {
    position: relative;

    a {
      text-decoration: none;
      display: block;
    }

    svg {
      position: absolute;
      padding-right: 10px;
      left: -25px;
      top: 50%;
      transform: translateY(-50%);
      height: 16px;
      width: 25px;

      g { fill: #FFF }
    }

    &:hover svg, svg:hover{
      g { fill: inherit; }
    }
  }

  ul {
    list-style: disc;
    padding-left: 2rem;
  }

  img {
    max-width: 100%;
  }

  blockquote {
    border-left: 3px solid #315FA8;
    padding-left: 1rem;
    font-style: italic;
  }

  pre, code {
    font-size: 14px;
  }

  p > code, div > code, ul > code, ol > code, li > code {
    border-radius: 4px;
    padding: .05rem .25rem !important;
    display: inline-block;
  }

  pre .line-numbers {
    white-space: pre;
  }

  pre .no-line-numbers {
    white-space: pre-wrap;
  }

  table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  table th {
    font-weight: bold;
  }

  table th,
  table td {
    padding: 6px 13px;
    border: 1px solid #ddd;
  }

  table tr {
    background-color: #fff;
    border-top: 1px solid #ccc;
  }

  table tr:nth-child(2n) {
    background-color: #f8f8f8;
  }

  svg {
    height: 18px;
    width: 18px;
    margin-right: .5rem;
    margin-bottom: 2px;
  }

  hr {
    border-bottom-color: #eee;
    height: .25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e7e7e7;
    border: 0;
  }
`
