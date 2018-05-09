import { css } from 'glamor'

export default {
  wrapper: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px',
    padding: '0 30px',
    borderBottom: '1px solid #E6E9EB',
  }),
  nav: css({
    flexShrink: 0,
    '& a': {
      display: 'inline-block',
      color: 'rgba(0, 0, 0, .5)',
      padding: '4px 0',
      textDecoration: 'none',
      marginLeft: '20px',
      ':hover': {
        borderBottom: '1px solid rgba(0, 0, 0, .1)',
      },
    },
  }),
}
