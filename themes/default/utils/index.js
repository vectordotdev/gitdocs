export function ellipsify (text, limit) {
  if (!text) return ''

  if (text.length <= limit) {
    return text
  }

  return `${text.substring(0, limit)}...`
}

export function debounce (func, wait, immediate) {
  let timeout

  return () => {
    const context = this
    const args = arguments
    const now = immediate && !timeout

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      !immediate && func.apply(context, args)
    }, wait)

    now && func.apply(context, args)
  }
}
