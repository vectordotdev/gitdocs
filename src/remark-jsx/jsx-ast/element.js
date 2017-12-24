import convertProperties from './attributes'

// Converts a JSXText element to HAST
export function convertJSXText (element, position) {
  return {
    type: 'text',
    value: element.value,
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

// Return HAST for a single child element
function convertJSX (element, position) {
  switch (element.type) {
    case 'JSXElement':
      return convertJSXElement(element, position)
    case 'JSXText':
      return convertJSXText(element, position)
    default:
      throw new Error(`Unknown element type ${element.type} seen.`)
  }
}

// Convers a JSXElement to HAST
export function convertJSXElement (element, position) {
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

// Get the tag name for an expression
function getTagName (expression) {
  return expression.openingElement.name.name.toLowerCase()
}
