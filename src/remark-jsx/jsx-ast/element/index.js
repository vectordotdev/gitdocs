import { convertJSXElement } from './jsx'
import { convertJSXText } from './text'

import convertProperties, { evaluateExpressionContainer } from '../attributes'

// Return HAST for a single child element
export function convertJSX (element, position, identifierMap) {
  switch (element.type) {
    case 'JSXElement':
      const converted = convertJSXElement(element, position)
      converted.children = []

      for (let i = 0; i < element.children.length; i += 1) {
        const c = convertJSX(element.children[i], position, identifierMap)
        if (Array.isArray(c)) {
          // An array expression returns an array, so flatten out
          converted.children.push(...c)
        } else {
          converted.children.push(c)
        }
      }

      converted.properties = convertProperties(element, identifierMap)
      return converted
    case 'JSXExpressionContainer':
      const exp = evaluateExpressionContainer(element, identifierMap)
      if (exp && (exp.type) || Array.isArray(exp)) {
        return exp
      }
      return convertJSXText({
        value: exp.toString(),
        start: -1,
        end: -1,
      }, { start: { offset: 0 }, end: { offset: 0 } })
    case 'JSXText':
      return convertJSXText(element, position)
    default:
      throw new Error(`Unknown element type ${element.type} seen.`)
  }
}
