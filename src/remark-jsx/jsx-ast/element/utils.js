// Get the tag name for an expression
export function getTagName (expression) {
  return expression.openingElement.name.name.toLowerCase()
}
