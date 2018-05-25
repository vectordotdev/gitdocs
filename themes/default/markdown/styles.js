import styled from 'react-emotion'

export const Wrapper = styled('div')`
  word-wrap: break-word;
  color: #2f3138;
  
  a {
    text-decoration: none;
    color: #5944CC;
  }
  h1, h2, h3, h4 {
    font-weight: bold;
    text-decoration: none;
    margin: 0;
    color: #0D0A2B;
  }

  p {
    line-height: 1.7rem;
  }

  ul {
    list-style: disc;
    padding-left: 2rem;
  }

  img {
    max-width: 100%;
  }

  blockquote {
    border-left: 3px solid #b6b3da;
    padding-left: 1rem;
    font-style: italic;
  }

  pre {
    overflow-x: scroll;
  }

  pre, code {
    font-family: monospace;
    -webkit-font-smoothing: initial !important;
  }

  code {
    border-radius: 4px;
    padding: .15rem .25rem;
    display: inline;
    line-height: 1.5;
    word-break: break-all;
    background: #EEEAFE;
    color: #5742CA;
  }

  pre code {
    font-size: 1.1rem;
    border: none;
    word-break: break-all;
    white-space: pre-wrap;
    display: inline-block !important;
    background: inherit;
    color: rgb(52, 50, 64);
  }

  pre {
    border-radius: 4px;
    font-family: Roboto Mono, monospace;
    border-radius: 3px;
    line-height: 19px;
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

  code.hljs.shell:before, code.hljs.bash:before {
    content: "$";
    margin-right: 5px;
    color: #b4b1d8;
  }

  .hljs {
    background: #F4F5F6;
  }

  .hljs-string {
    color: #955CCB;
  }

  .hljs-attr {
    color: #4078f2;
  }

  .syntax-shell {
    padding-left: 5px !important;
  }

  .react-syntax-highlighter-line-number {
    font-size: .85rem;
  }

  .syntax-shell .react-syntax-highlighter-line-number {
    opacity: 0.5;
    visibility: hidden;
    position: absolute;
    height: 0;
  }

  .syntax-shell .react-syntax-highlighter-line-number::after {
    content: "$";
    visibility: visible;
    left: 0px;
    top: -4px;
    position: absolute;
  }
`
