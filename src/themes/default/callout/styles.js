import { css } from 'glamor'

export default {
  wrapper: css({
    color: 'rgba(0, 0, 0, .2)',
    fontSize: '.8rem',
    fontWeight: 900,
    padding: '20px',
    textAlign: 'center',
    textDecoration: 'none',
    ':hover': {
      color: 'rgba(0, 0, 0, .4)',
    },
  }),
}
