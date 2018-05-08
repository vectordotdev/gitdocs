import { css } from 'glamor'

const stretch = css.keyframes({
  '0%, 40%, 100%': {
    transform: 'scaleY(0.4)',
  },
  '20%': {
    transform: 'scaleY(1.0)',
  },
})

export default {
  wrapper: css({
    width: '50px',
    height: '40px',
    textAlign: 'center',
    fontSize: '10px',
    '& > div': {
      background: '#E6E9EB',
      height: '100%',
      width: '5px',
      display: 'inline-block',
      animation: `${stretch} 1.2s infinite ease-in-out`,
      margin: '0 1px',
    },
    '& :nth-child(2)': {
      animationDelay: '-1.1s',
    },
    '& :nth-child(3)': {
      animationDelay: '-1.0s',
    },
    '& :nth-child(4)': {
      animationDelay: '-0.9s',
    },
    '& :nth-child(5)': {
      animationDelay: '-0.8s',
    },
  }),
}
