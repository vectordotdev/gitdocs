import styled from 'styled-components'

export default styled.div`
  color: rgba(0,0,0,.7);
  line-height: 1.5;

  h1, h2, h3, h4, h5, h6 {
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

  & :not(pre) > code {
    font-size: .9em;
    border-radius: 4px;
    display: inline-block;
    margin: 0;
    padding: .05rem .25rem !important;
    background: rgba(0, 0, 0, .05);
  }

  pre {
    border-radius: 4px;
    font-size: .9rem;
    line-height: 1.45;
    display: block;
    overflow-x: auto;
    color: rgb(56, 58, 66);
    background: rgba(0, 0, 0, 0.03);
    padding: 0.5em;

    pre {
      padding: 0 !important;
      margin: 0 !important;
    }
  }

  pre .line-numbers {
    white-space: pre;
  }

  pre .no-line-numbers {
    white-space: pre-wrap;
  }

  pre.language-bash .react-syntax-highlighter-line-number,
  pre.language-shell .react-syntax-highlighter-line-number {
    font-size: 1px;
    letter-spacing: -1px;
  }

  pre.language-bash .react-syntax-highlighter-line-number:first-child::before,
  pre.language-shell .react-syntax-highlighter-line-number:first-child::before {
    content: '$';
  }}

  pre.language-bash .react-syntax-highlighter-line-number::before,
  pre.language-shell .react-syntax-highlighter-line-number::before {
    content: '>';
    font-size: 14px;
    color: inherit;
  }}

  ul p {
    margin: 0;
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

  > svg {
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
