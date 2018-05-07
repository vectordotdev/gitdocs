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

  search: css({
    fontSize: '.9rem',
    padding: '8px 15px',
    border: '1px solid #E6E9EB',
    borderRadius: '30px',
    width: '100%',
  }),

  searchPlaceholder: css({
    color: '#ACB0B2',
  }),

  nav: css({
    '& a': {
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
