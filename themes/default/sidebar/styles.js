import { css } from 'glamor'

export default {
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxWidth: '250px',
    marginLeft: 'auto',
    textAlign: 'left',
    '@media (max-width: 850px)': {
      maxWidth: '100%',
      height: '70px',
    },
  }),

  topWrapper: css({
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70px',
    padding: '0 20px',
    '@media (max-width: 850px)': {
      justifyContent: 'space-between',
    },
  }),

  menuWrapper: css({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 850px)': {
      background: '#F5F7F9',
      boxShadow: '-2px 0 3px rgba(0, 0, 0, .2)',
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      zIndex: 10,
      width: '100%',
      maxWidth: '300px',
      overflow: 'auto',
      opacity: 0,
      transform: 'translateX(100%)',
      transition: 'transform .2s, opacity .2s',
    },
  }),

  menuWrapperOpen: css({
    '@media (max-width: 850px)': {
      opacity: 1,
      transform: 'translateX(0%)',
    },
  }),

  icons: css({
    width: '30px',
    height: '30px',
    fill: 'rgba(0, 0, 0, .5)',
    cursor: 'pointer',
    ':hover': {
      opacity: 0.7,
    },
  }),

  close: css({
    flexShrink: 0,
    display: 'none',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '70px',
    padding: '0 20px',
    '@media (max-width: 850px)': {
      display: 'flex',
    },
  }),

  logo: css({
    color: '#6457DF',
    fontSize: '1.6rem',
    fontWeight: 700,
    textDecoration: 'none',
    ':hover': {
      opacity: 0.5,
    },
  }),

  hamburger: css({
    display: 'none',
    '@media (max-width: 850px)': {
      display: 'block',
    },
  }),

  nav: css({
    flex: '1 0 auto',
    borderTop: '1px solid #E6E9EB',
    borderBottom: '1px solid #E6E9EB',
    padding: '30px 0 30px 15px',
  }),

  navItem: css({
    '& a': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#0d2b3e',
      fontSize: '.95rem',
      fontWeight: 700,
      textDecoration: 'none',
      cursor: 'pointer',
      lineHeight: '30px',
      borderLeft: '3px solid transparent',
      ':hover': {
        opacity: 0.7,
      },
      '&.active': {
        color: '#6457DF',
        borderRight: '3px solid #6457DF',
      },
      '& svg': {
        fill: 'rgba(0, 0, 0, .5)',
        width: '15px',
        height: '15px',
        marginRight: '15px',
      },
    },
  }),

  navItemNotFirst: css({
    paddingLeft: '20px',
    '& a': {
      color: '#4c555a',
      fontSize: '.9rem',
      fontWeight: 300,
      '&.active': {
        fontWeight: 700,
        ':hover': {
          opacity: 1,
        },
      },
    },
  }),

  navLinks: css({
    padding: '30px 0',
  }),

  arrow: css({
    width: '20px',
    height: '20px',
    fill: 'red',
    float: 'right',
  }),

  callout: css({
    flexShrink: 0,
    color: 'rgba(0, 0, 0, .2)',
    fontSize: '.8rem',
    fontWeight: 900,
    padding: '20px 0',
    textDecoration: 'none',
    textAlign: 'center',
    ':hover': {
      color: 'rgba(0, 0, 0, .3)',
    },
  }),
}
