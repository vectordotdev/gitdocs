import { parse } from 'acorn-jsx'


function getTagName (expression) {
  return expression.openingElement.name.name.toLowerCase()
}

function convertProperties (expression) {
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

function convertExpression (expression, position) {
  switch (expression.type) {
    case 'JSXElement':
      return convertJSXElement(expression, position)
    default:
      throw new Error(`Unknown expression type ${expression.type} encountered.`)
  }
}


function convertJSXText (element, position) {
  return {
    type: 'text',
    value: element.value,
    position: {
      start: {
        offset: position.start.offset + element.start,
      },
      end: {
        offset: position.start.offset + element.end,
      },
    },
  }
}

function convertJSXElement (element, position) {
  const children = element.children.map(child => convertJSX(child, position))
  const properties = convertProperties(element)

  return {
    type: 'element',
    tagName: getTagName(element),
    children,
    properties,
    position: {
      // TODO: calculate line and columns for start and end ???
      start: {
        offset: position.start.offset + element.start,
      },
      end: {
        offset: position.start.offset + element.end,
      },
    },
  }
}


function convertJSX (element, position) {
  // Return HAST for a single child element
  switch (element.type) {
    case 'JSXElement':
      return convertJSXElement(element, position)
    case 'JSXText':
      return convertJSXText(element, position)
    default:
      throw new Error(`Unknown type ${element.type}`)
  }
}


function convertTopLevel (element, position) {
  // Return HAST for a single top level element
  switch (element.type) {
    case 'ExpressionStatement':
      return convertExpression(element.expression, position)
    default:
      throw new Error(`Unknown AST element type ${element.type}`)
  }
}


export function astToHast (ast, position) {
  if (!ast.body) {
    throw new Error('No body to convert')
  }
  const elements = ast.body.map(element => convertTopLevel(element, position))
  return elements
}


export default function jsx () {
  return root => {
    const children = root.children

    const splices = []

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i]

      if (child.type === 'raw') {
        try {
          const ast = parse(child.value, {
            plugins: {
              jsx: true,
            },
          })
          const elements = astToHast(ast, child.position)
          splices.push([i, elements])
        } catch (err) {
          break
        }
      }
    }

    for (let i = 0; i < splices.length; i += 1) {
      const index = splices[i][0]
      const elements = splices[i][1]
      Array.prototype.splice.apply(children, [index, 1].concat(elements))
    }
  }
}
