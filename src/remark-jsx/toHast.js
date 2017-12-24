import { parse } from 'acorn-jsx'
import convertStatement from './jsx-ast/statement'


export function astToHast (ast, position) {
  if (!ast.body) {
    throw new Error('No body to convert')
  }
  const elements = ast.body.map(statement => convertStatement(statement, position))
  return elements
}


export default function jsx () {
  return root => {
    const children = root.children

    const splices = []

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i]

      if (child.type === 'raw') {
        try {
          const ast = parse(child.value, {
            plugins: {
              jsx: true,
            },
          })
          const elements = astToHast(ast, child.position)
          splices.push([i, elements])
        } catch (err) {
          break
        }
      }
    }

    for (let i = 0; i < splices.length; i += 1) {
      const index = splices[i][0]
      const elements = splices[i][1]
      Array.prototype.splice.apply(children, [index, 1].concat(elements))
    }
  }
}
