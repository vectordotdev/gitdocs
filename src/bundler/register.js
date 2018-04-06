import path from 'path'
import register from '@babel/register'

const NODE_MODULES = path.resolve(
  __dirname,
  '../../node_modules'
)

register({
  plugins: [
    `${NODE_MODULES}/@babel/plugin-transform-modules-commonjs`,
    `${NODE_MODULES}/@babel/plugin-transform-react-jsx`
  ]
})
