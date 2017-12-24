import { convertJSX } from '../element'

export default function createJSXExpressionParser(evaluateExpression) {
  return (expression, identifierMap) => {
    return convertJSX(expression, {
      start: {
        offset: expression.start,
      },
    }, identifierMap)
  }
}
