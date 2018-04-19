import { titlify } from '../utils/path'

export default async function (routeItems) {
  const _recursive = routes => routes.map(route => {
    const data = route.data || {}
    const hasIndex = route.children &&
      route.children.findIndex(({ index }) => index) > -1

    const navItem = {
      text: data.title || titlify(route.path),
    }

    // index link is always on parent item in the navigation
    if (route.index) {
      return null
    }

    if (route.output || hasIndex) {
      navItem.link = route.path
    }

    if (route.children) {
      navItem.items = _recursive(route.children)
    }

    return navItem
  }).filter(Boolean)

  return _recursive(routeItems)
}
