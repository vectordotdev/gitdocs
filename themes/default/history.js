import { createBrowserHistory } from 'history'

const history = typeof window !== 'undefined'
  ? createBrowserHistory()
  : {}

export default history
