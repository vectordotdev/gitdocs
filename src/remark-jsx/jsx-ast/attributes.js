import createExpressionParser from './expression'

function getAttributeName (attribute) {
  return attribute.name.name
}

function getAttributeValue (attribute, identifierMap) {
  switch (attribute.value.type) {
    case 'JSXExpressionContainer':
      return evaluateExpressionContainer(attribute.value, identifierMap)
    case 'Literal':
      return attribute.value.value
    default:
      throw new Error(`Unknown attribute value type ${attribute.value.type}`)
  }
}

export function evaluateExpressionContainer (value, identifierMap) {
  const parser = createExpressionParser()
  return parser(value.expression, identifierMap)
}

export default function convertProperties (expression, identifierMap) {
  const attributes = expression.openingElement.attributes || []
  const len = attributes.length
  const props = {}

  for (let i = 0; i < len; i += 1) {
    // Check each attribute and get it's value
    const attribute = attributes[i]
    const name = getAttributeName(attribute)
    const val = getAttributeValue(attribute, identifierMap)
    props[name] = val
  }

  return props
}
