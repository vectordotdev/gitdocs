function getPropKey (key) {
  switch (key.type) {
    case 'Identifier':
      return key.name
    default:
      throw new Error(`Unknow object property key type ${key.type}`)
  }
}

function getPropValue (value, parseObjectExpression, identifierMap) {
  switch (value.type) {
    case 'Literal':
      return value.value
    case 'ObjectExpression':
      return parseObjectExpression(value, identifierMap)
    default:
      throw new Error(`Unknown object property value type ${value.type}`)
  }
}

export default function createObjectExpressionParser (evaluateExpression) {
  const parseObjectExpression = (attributeExpression, identifierMap) => {
    const properties = attributeExpression.properties || []
    const len = properties.length
    const obj = {}

    for (let i = 0; i < len; i += 1) {
      const prop = properties[i]
      const key = getPropKey(prop.key)
      const value = getPropValue(prop.value, parseObjectExpression, identifierMap)
      obj[key] = value
    }

    return obj
  }
  return parseObjectExpression
}
