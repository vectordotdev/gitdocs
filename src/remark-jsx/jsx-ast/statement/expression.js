import { convertJSX } from '../element'

export default function convertExpression (expression, position) {
  switch (expression.type) {
    case 'JSXElement':
      return convertJSX(expression, position)
    default:
      throw new Error(`Unknown expression type ${expression.type} encountered during expression statement parsing.`)
  }
}
