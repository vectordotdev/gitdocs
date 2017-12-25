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

export default function createMemberExpressionParser(evaluateExpression) {
  return (expression, identifierMap) => {
    const object = evaluateExpression(expression.object)
    const name = expression.property.name
    return object[name]
  }
}
