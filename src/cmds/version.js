import { version } from '../../package.json'

export default async function (args, config) {
  console.log(`v${version}`)
}
