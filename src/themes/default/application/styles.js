import { css } from 'glamor'

const font = {
  fontFamily: 'Overpass, sans-serif',
  fontWeight: 300,
  fontSize: '16px',
  lineHeight: 1,
}

css.global('* > *', font)
css.global('input', font)

export default {
  wrapper: css({
    display: 'flex',
    height: '100vh',
    '@media (max-width: 850px)': {
      flexDirection: 'column',
    },
  }),

  nav: css({
    flex: 1,
    background: 'linear-gradient(left, #F5F7F9 0%, #F0F2F4 100%)',
    borderRight: '1px solid #E6E9EB',
    minWidth: '250px',
    textAlign: 'right',
    overflow: 'auto',
    '@media (max-width: 850px)': {
      flex: '0 auto',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0, 0, 0, .2)',
    },
  }),

  page: css({
    flex: 2,
    overflow: 'auto',
    position: 'relative',
  }),
}
