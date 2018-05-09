import { css } from 'glamor'

export default {
  search: css({
    flex: 1,
    display: 'flex',
    position: 'relative',
  }),

  input: css({
    outline: 'none',
    fontSize: '.9rem',
    padding: '8px 15px',
    border: '1px solid #E6E9EB',
    borderRadius: '30px',
    display: 'block',
    flex: 1,
  }),

  searchPlaceholder: css({
    color: '#ACB0B2',
  }),

  results: css({
    position: 'absolute',
    width: '100%',
    top: 75,
    height: 'calc(100vh - 75px)',
    background: '#FFF',
  }),

  result: css({
    padding: '1rem',
    ':hover': {
      background: '#F7F8F9'
    }
  }),

  resultTitle: css({
    fontWeight: 'bold',
    textDecoration: 'underline',
  }),

  resultURL: css({
    color: '#333',
    textDecoration: 'none'
  }),

  selected: css({
    background: '#F7F8F9'
  })
}
