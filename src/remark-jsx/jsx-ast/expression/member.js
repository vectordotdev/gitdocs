export default function createMemberExpressionParser (evaluateExpression) {
  return (expression, identifierMap) => {
    const object = evaluateExpression(expression.object)
    const name = expression.property.name
    return object[name]
  }
}
