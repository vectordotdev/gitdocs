const handlers = {
  'join': Array.prototype.join,
  'map': Array.prototype.map,
  'split': String.prototype.split,
}

function getMethod(method) {
  try {
    return handlers[method]
  } catch (err) {
    throw new Error(`Unknown call expression method ${method} seen.`)
  }
}

export default function createCallExpressionParser(evaluateExpression) {
  return (expression, identifierMap) => {
    const callee = evaluateExpression(expression.callee.object, identifierMap)
    const method = getMethod(expression.callee.property.name)
    const args = expression.arguments.map(x => evaluateExpression(x, identifierMap))
    return method.call(callee, ...args)
  }
}
