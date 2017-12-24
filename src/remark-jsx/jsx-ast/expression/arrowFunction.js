export default function createArrowFunctionParser(evaluateExpression) {
  return (expression, outerIdentifierMap) => {
    const identifierPositionToName = {}
    for (let i = 0; i < expression.params.length; i += 1) {
      const param = expression.params[i]
      identifierPositionToName[i] = param.name
    }
  
    return function() {
      const args = [...arguments]
      // Map of identifier name to value
      const identifierMap = {
        ...outerIdentifierMap
      }
      for (let i = 0; i < args.length; i += 1) {
        identifierMap[identifierPositionToName[i]] = args[i]
      }
  
      return evaluateExpression(expression.body, identifierMap)
    }
  }
}
