import styled, { keyframes } from 'react-emotion'

const stretch = keyframes`
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1.0);
  }
`

export const Wrapper = styled('div')`
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;
    div {
      background: #E6E9EB;
      height: 100%;
      width: 5px;
      display: inline-block;
      animation: ${stretch} 1.2s infinite ease-in-out;
      margin: 0 1px;
      &:nth-child(2) {
        animation-delay: -1.1s;
      }
      &:nth-child(3) {
        animation-delay: -1.0s;
      }
      &:nth-child(4) {
        animation-delay: -0.9s;
      }
      &:nth-child(5) {
        animation-delay: -0.8s;
      }
    }
  }),
`
