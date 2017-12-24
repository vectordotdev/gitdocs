import { convertJSXElement } from './element'

export default function convertExpression (expression, position) {
  switch (expression.type) {
    case 'JSXElement':
      return convertJSXElement(expression, position)
    default:
      throw new Error(`Unknown expression type ${expression.type} encountered.`)
  }
}
