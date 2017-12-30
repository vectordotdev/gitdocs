export default function createIdentifierParser () {
  return (expression, identifierMap) => identifierMap[expression.name]
}
