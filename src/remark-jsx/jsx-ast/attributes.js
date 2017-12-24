function getAttributeName (attribute) {
  return attribute.name.name
}

function getAttributeValue (attribute) {
  switch (attribute.value.type) {
    case 'JSXExpressionContainer':
      return getJSXExpressionAttributeValue(attribute)
    case 'Literal':
      return attribute.value.value
    default:
      throw new Error(`Unknown attribute value type ${attribute.value.type}`)
  }
}

function getJSXExpressionAttributeValue (attribute) {
  const expression = attribute.value.expression

  switch (expression.type) {
    case 'ObjectExpression':
      return parseObjectExpression(expression)
    case 'Literal':
      return expression.value
    default:
      throw new Error(`Unknown JSX Attribute Expression type of ${expression.type}`)
  }
}

function parseObjectExpression (attributeExpression) {
  const properties = attributeExpression.properties || []
  const len = properties.length
  const obj = {}

  for (let i = 0; i < len; i += 1) {
    const prop = properties[i]
    const key = getPropKey(prop.key)
    const value = getPropValue(prop.value)
    obj[key] = value
  }

  return obj
}

function getPropKey (key) {
  switch (key.type) {
    case 'Identifier':
      return key.name
    default:
      throw new Error(`Unknow object property key type ${key.type}`)
  }
}

function getPropValue (value) {
  switch (value.type) {
    case 'Literal':
      return value.value
    case 'ObjectExpression':
      return parseObjectExpression(value)
    default:
      throw new Error(`Unknown object property value type ${value.type}`)
  }
}

export default function convertProperties (expression) {
  const attributes = expression.openingElement.attributes || []
  const len = attributes.length
  const props = {}

  for (let i = 0; i < len; i += 1) {
    // Check each attribute and get it's value
    const attribute = attributes[i]
    const name = getAttributeName(attribute)
    const val = getAttributeValue(attribute)
    props[name] = val
  }

  return props
}
