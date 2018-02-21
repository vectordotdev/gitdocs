import styled, { css } from 'styled-components'

export default styled.aside`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 280px;
  background: #f4f7fa;
  margin: 0;
  z-index: 99;
  box-shadow: 1px 0 0 0 #dfe3e8, 1px 0 0 0 #dfe3e8;
  transition: all 0.2s ease-out;

  > .inner {
    height: 100%;
    display: flex;
    flex-direction: column;

    > ul {
      padding: 1rem 1rem 1.5rem 1rem;
      overflow-y: auto;
    }
  }

  ${props =>
    (props.position === 'left'
      ? css`
          left: 0;
          transform: translateX(-100%);
          ${props.sidebarIsOpen && css`transform: translateX(0);`};
        `
      : css`
          right: 0;
          transform: translateX(100%);
          ${props.sidebarIsOpen && css`transform: translateX(0);`};
        `)};

  @media (min-width: 1500px) {
    position: fixed;
    background: #fff;
    margin: 2rem 0 0;
    padding-top: 0;
    left: 50%;
    transform: translateX(-600px);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul ul {
    padding-left: 15px;
  }

  ul ul ul {
    border-left: 3px solid #e4e4e4;
  }

  ul li {
    margin-bottom: 0.75rem;
  }

  li > ul {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  li > a {
    text-decoration: none;
    color: #404e5c;
    font-size: 1rem;
    line-height: 1.5;
    display: block;

    &.active {
      color: #4688f1;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  h1,
  h2,
  h3 {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #919eab;
    font-weight: 700;
    font-size: 0.75rem;

    a {
      text-decoration: none;
    }
  }
`
