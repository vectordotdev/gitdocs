import { css } from 'glamor'

css.global('* > *', {
  boxSizing: 'border-box',
  fontFamily: 'Overpass, sans-serif',
  fontWeight: 300,
  fontSize: '16px',
  lineHeight: 1,
})

export default {
  wrapper: css({
    display: 'flex',
    minHeight: '100vh',
  }),
}
