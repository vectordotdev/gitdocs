import { getTagName } from './utils'

// Converts a JSXElement to HAST
export function convertJSXElement (element, position) {
  return {
    type: 'element',
    tagName: getTagName(element),
    // children,
    // properties,
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
