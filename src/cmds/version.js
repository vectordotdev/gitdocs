import { version } from '../../package.json'
import { log } from '../utils/emit'

export default async function (args, config) {
  log(`GitDocs v${version}`, true)
}
