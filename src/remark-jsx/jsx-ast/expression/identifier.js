export default function createIdentifierParser() {
  return (expression, identifierMap) => {
    return identifierMap[expression.name]
  }
}
