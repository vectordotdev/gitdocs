import path from 'path'
import register from '@babel/register'

const NODE_MODULES = path.resolve(
  __dirname,
  '../../node_modules'
)

register({
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-react-jsx'
  ]
})
