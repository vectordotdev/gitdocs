import { titlify } from '../utils/path'

export default async function (tree) {
  const _recursive = items => items
    .map(item => {
      // index link goes on parent item in the navigation
      if (item.isIndex) {
        return null
      }

      const data = item.data || {}
      const hasIndex = item.children &&
        item.children.findIndex(({ isIndex }) => isIndex) > -1

      const navItem = {
        text: data.title || titlify(item.path),
      }

      if (item.output || hasIndex) {
        navItem.link = item.path
      }

      if (item.children) {
        navItem.children = _recursive(item.children)
      }

      return navItem
    })
    .filter(Boolean)
    // sort children alphabetically
    .sort((a, b) => a.text > b.text)

  return _recursive(tree)
}
