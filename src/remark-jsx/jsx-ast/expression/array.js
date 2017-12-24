export default function createArrayExpressionParser(evaluateExpression) {
  return (expression, identifierMap) => {
    const arrayElements = expression.elements || []
    return arrayElements.map(x => evaluateExpression(x, identifierMap))
  }
}
