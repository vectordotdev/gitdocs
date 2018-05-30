const syspath = require('path')
// const chokidar = require('chokidar')
const ourpath = require('../utils/path')
const { getFrontmatterOnly } = require('../utils/frontmatter')
const { mergeLeftByKey } = require('../utils/merge')
const { walkSource } = require('./source')

async function getMetaData (item, parentItems) {
  const data = item.type === 'file'
    ? await getFrontmatterOnly(item.path)
    : {}

  // @TODO warn about conflicting items in parent and self
  // inherit front matter from the parent sidebar config
  const dataFromParent = parentItems
    .find(i => i.path === item.path_relative)

  return { ...data, ...dataFromParent }
}

function normalizeItems (data) {
  const itemsMessy =
    data.items ||
    data.items_prepend ||
    data.items_append ||
    []

  const items = itemsMessy.map(item => {
    if (typeof item !== 'string' && typeof item !== 'object') {
      throw new TypeError(`Each item must be a string or object, got ${typeof item}`)
    }

    return typeof item === 'string'
      ? { path: item }
      : item
  })

  const hasProp = Object.prototype.hasOwnProperty
  const strategy = hasProp.call(data, 'items')
    ? 'replace' : hasProp.call(data, 'items_prepend')
      ? 'prepend' : hasProp.call(data, 'items_append')
        ? 'append' : null

  return {
    items,
    strategy,
  }
}

async function hydrateTree (tree, config, onRegenerate) {
  const urls = {}

  if (tree.childrenIndex === undefined) {
    throw new Error('No index file was found! Create a `readme.md` at the root of your project.')
  }

  const _recursive = async (
    item,
    itemParent = {},
    itemParentItems = [],
  ) => {
    const {
      path_relative,
      childrenIndex,
      children = [],
    } = item

    // hoist the index file and use it instead of the current item,
    // if there is an index file under it's children
    const hoistedItem = childrenIndex !== undefined
      ? item.children[childrenIndex]
      : item

    // extract front matter from file while inheriting data from parent
    const metaData = await getMetaData(hoistedItem, itemParentItems)

    // start hydrating the current item
    const hydratedItem = {
      path: path_relative,
      draft: metaData.draft || false,
      title: metaData.title || (itemParent.path !== undefined
        // convert the file path into the title
        ? ourpath.titlify(hoistedItem.path)
        // use the project name as the title if we are at the root
        : config.name),
    }

    // only files should have a url, input and output value
    if (hoistedItem.type === 'file') {
      hydratedItem.url = ourpath.routify(
        syspath.resolve(
          '/', // don't resolve from the cwd
          itemParent.url || itemParent.path || config.baseURL,
          metaData.url || hydratedItem.path,
        )
      )

      hydratedItem.input = metaData.input || hoistedItem.path
      hydratedItem.outputDir = syspath.join(config.output, hydratedItem.url)

      // ensure there are no duplicated urls
      if (urls[hydratedItem.url]) {
        const duplicated = [hydratedItem.url, hoistedItem.path, urls[hydratedItem.url]]
        throw new Error(`Duplicated URL was found: ${duplicated.join('\n\t- ')}`)
      }

      // pull in source items if one exists
      if (metaData.source) {
        const source = await walkSource(config.temp, hoistedItem.path, metaData)
        const sourceHydrated = await _recursive(source, hydratedItem)

        // don't inherit these items from the source
        delete sourceHydrated.path
        delete sourceHydrated.title

        // replace current item data with the source data
        Object.assign(hydratedItem, sourceHydrated)
      // don't register the url when there is a source (since item gets replaced)
      } else {
        // url is now taken, like most women
        urls[hydratedItem.url] = hoistedItem.path
      }
    }

    // get sub items from the front matter
    const {
      items: metaDataItems,
      strategy: mergeStrategy,
    } = normalizeItems(metaData)

    // recurse sub items from the dir tree
    const childrenItemsUnsorted = await Promise.all(
      children
        .filter(({ index }) => !index)
        .map(childItem => _recursive(childItem, hydratedItem, metaDataItems))
    )

    // sort alphabetically by default
    const childrenSorted = childrenItemsUnsorted
      .sort((a, b) => a.title.localeCompare(b.title))

    // @TODO: figure out how to remove items_pre/append from the result
    const mergedItems = mergeLeftByKey(metaDataItems, childrenSorted, {
      key: 'path',
      name: hoistedItem.path,
      strategy: mergeStrategy,
    })

    hydratedItem.items = [
      ...mergedItems || [],
      ...hydratedItem.items || [],
    ]

    return hydratedItem
  }

  return _recursive(tree)
}

// async function hydrateContent (manifest) {
//   const _recursive = async (item) => {
//     if (item.input) {
//       item.content = await getContent(item.input)
//     }
//
//     if (item.items) {
//       item.items = await Promise.all(
//         item.items.map(i => _recursive(i))
//       )
//     }
//
//     return item
//   }
//
//   return _recursive(manifest)
// }

//   if (typeof onRegenerate === 'function') {
//     const watcher = chokidar.watch(config.root, {
//       ignoreInitial: true,
//     })
//
//     watcher.on('all', onRegenerate)
//   }

module.exports = {
  getMetaData,
  normalizeItems,
  hydrateTree,
  // hydrateContent,
}
