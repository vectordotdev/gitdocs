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
