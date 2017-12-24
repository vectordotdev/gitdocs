const handlers = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b,
}

function getHandler (operator) {
  try {
    return handlers[operator]
  } catch (err) {
    throw new Error(`Unknown binary expression operator ${operator} seen.`)
  }
}

export default function createBinaryExpressionParser (evaluateExpression) {
  return (expression, identifierMap) => {
    const left = evaluateExpression(expression.left, identifierMap)
    const right = evaluateExpression(expression.right, identifierMap)
    const handler = getHandler(expression.operator)
    return handler(left, right)
  }
}
