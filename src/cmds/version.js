import { log } from '../../utils/emit'
import { version } from '../../../package.json'

export default async function (args, config) {
  log(`v${version}`)
}
