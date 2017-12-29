import { convertJSX } from '../element'

export default function createJSXExpressionParser (evaluateExpression) {
  return (expression, identifierMap) => convertJSX(expression, {
    start: {
      offset: expression.start,
    },
  }, identifierMap)
}
