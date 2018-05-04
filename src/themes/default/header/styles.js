import { css } from 'glamor'

export default {
  wrapper: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '80px',
    padding: '0 40px',
    background: 'rgba(255, 255, 255, .98)',
    borderBottom: '1px solid #f1f3f5',
  }),

  logo: css({
    color: '#5f57ad',
    fontSize: '1.3rem',
    fontWeight: 300,
    textDecoration: 'none',
  }),

  nav: css({
    '& a': {
      color: 'rgba(0, 0, 0, .5)',
      paddingBottom: '3px',
      textDecoration: 'none',
      ':not(:last-child)': {
        marginRight: '40px',
      },
      ':hover': {
        borderBottom: '1px solid rgba(0, 0, 0, .2)',
      },
    },
  }),
}
