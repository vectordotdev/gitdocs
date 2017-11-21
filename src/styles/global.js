import { injectGlobal } from 'styled-components'

injectGlobal`
  html, body {
    height: 100%;
    width: 100%;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: "futura-pt", sans-serif;
  }

  .powered { display: none }

  main > div {
    overflow: hidden;
  }

  a {
    text-decoration: none;
    color: #4688F1;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .pace {
    pointer-events: none;
    user-select: none;
  }

  .pace-inactive {
    display: none;
  }

  .pace .pace-progress {
    opacity: .9;
    position: fixed;
    z-index: 2000;
    top: 0;
    right: 100%;
    width: 100%;
    height: 2px;
  }

  *,
  ::before,
  ::after {
    background-repeat: no-repeat; /* 1 */
    box-sizing: inherit; /* 2 */
  }

  ::before,
  ::after {
    text-decoration: inherit; /* 1 */
    vertical-align: inherit; /* 2 */
  }

  html {
    box-sizing: border-box; /* 1 */
    cursor: default; /* 2 */
    -ms-text-size-adjust: 100%; /* 3 */
    -webkit-text-size-adjust: 100%; /* 3 */
  }

  article,
  aside,
  footer,
  header,
  nav,
  section {
    display: block;
  }

  /**
   * Remove the margin in all browsers (opinionated).
   */

  body {
    margin: 0;
  }

  h1 {
    font-size: 2em;
    margin: .67em 0;
  }

  figcaption,
  figure,
  main { /* 1 */
    display: block;
  }

  /**
   * Add the correct margin in IE 8.
   */

  figure {
    margin: 1em 40px;
  }

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  nav ol,
  nav ul {
    list-style: none;
  }

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  a {
    background-color: transparent; /* 1 */
    -webkit-text-decoration-skip: objects; /* 2 */
  }

  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }

  b,
  strong {
    font-weight: inherit;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  dfn {
    font-style: italic;
  }

  mark {
    background-color: #ffff00;
    color: #000000;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -.25em;
  }

  sup {
    top: -.5em;
  }

  ::-moz-selection {
    background-color: #b3d4fc; /* 1 */
    color: #000000; /* 1 */
    text-shadow: none;
  }

  ::selection {
    background-color: #b3d4fc; /* 1 */
    color: #000000; /* 1 */
    text-shadow: none;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  audio,
  video {
    display: inline-block;
  }

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  img {
    border-style: none;
  }

  svg {
    fill: currentColor;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  table {
    border-collapse: collapse;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    margin: 0;
  }

  button,
  input,
  select,
  textarea {
    background-color: transparent;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button,
  input { /* 1 */
    overflow: visible;
  }

  button,
  select { /* 1 */
    text-transform: none;
  }

  button,
  html [type="button"], /* 1 */
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button; /* 2 */
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }

  progress {
    display: inline-block; /* 1 */
    vertical-align: baseline; /* 2 */
  }

  textarea {
    overflow: auto; /* 1 */
    resize: vertical; /* 2 */
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  [type="search"]::-webkit-search-cancel-button,
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  details, /* 1 */
  menu {
    display: block;
  }

  summary {
    display: list-item;
  }

  canvas {
    display: inline-block;
  }

  template {
    display: none;
  }

  a,
  area,
  button,
  input,
  label,
  select,
  summary,
  textarea,
  [tabindex] {
    -ms-touch-action: manipulation; /* 1 */
    touch-action: manipulation;
  }

  [hidden] {
    display: none;
  }

  [aria-busy="true"] {
    cursor: progress;
  }

  [aria-controls] {
    cursor: pointer;
  }

  [aria-hidden="false"][hidden]:not(:focus) {
    clip: rect(0, 0, 0, 0);
    display: inherit;
    position: absolute;
  }

  [aria-disabled] {
    cursor: default;
  }
`
