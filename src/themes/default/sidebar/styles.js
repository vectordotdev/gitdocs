import { css } from 'glamor'

export default {
  wrapper: css({
    position: 'fixed',
    top: '30px',
    bottom: '30px',
    overflow: 'auto',
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #DDDDDD',
    textAlign: 'left',
  }),

  logo: css({
    margin: '50px 0',
    fontSize: '20px',
    textDecoration: 'none',
    '& img': {
      maxWidth: '100px',
    },
  }),
}
