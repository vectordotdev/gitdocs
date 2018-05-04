import { css } from 'glamor'

export default {
  wrapper: css({
    // position: 'fixed',
    // top: '80px',
    // bottom: 0,
    // overflow: 'auto',
    minWidth: '300px',
    marginTop: '80px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  }),

  wrapperNav: css({
    flex: 1,
    padding: '50px 35px',
  }),

  nav: css({
    paddingLeft: '15px',
  }),

  navItem: css({
    display: 'block',
    color: '#999C9F',
    fontSize: '.9rem',
    lineHeight: '35px',
    textDecoration: 'none',
    paddingLeft: '15px',
    borderLeft: '3px solid transparent',
    cursor: 'pointer',
    ':hover': {
      opacity: 0.6,
    },
  }),

  navItemActive: css({
    color: 'rgb(95, 87, 173)',
    borderColor: 'rgba(95, 87, 173, .2)',
    fontWeight: 700,
    ':hover': {
      opacity: 1,
    },
  }),
}
