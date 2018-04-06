import path from 'path'
import webpack from 'webpack'
// import MemoryFS from 'memory-fs'

const OUTPUT_DIR = path.resolve(process.cwd(), 'docs_dist')
const TEMPLATE_DIR = path.resolve(__dirname, '../../template')

export default function () {
  // const fs = new MemoryFS()
  const compiler = webpack({
    entry: `${TEMPLATE_DIR}/index.js`,
    output: {
      path: OUTPUT_DIR,
      filename: 'bundle.js',
    },
  })

  return new Promise((resolve, reject) => {
    // compiler.outputFileSystem = fs
    compiler.run((err, stats) => {
      console.log(err, stats)
      // const content = fs.readFileSync("...");

      resolve()
    })
  })
}
