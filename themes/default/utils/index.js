export function ellipsify (text, limit) {
  if (!text) return ''

  if (text.length <= limit) {
    return text
  }

  return `${text.substring(0, limit)}...`
}
