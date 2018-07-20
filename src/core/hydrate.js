const syspath = require('path')
const markdownToc = require('markdown-toc')
const ourpath = require('../utils/path')
const { getFrontmatterOnly } = require('../utils/frontmatter')
const { mergeLeftByKey } = require('../utils/merge')
const { getContent } = require('./filesystem')
const { walkSource } = require('./source')
const Sitemap = require('./sitemap')

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

async function tableOfContents (toc, { input, items }) {
  // only add items that have a file associated with it
  if (input) {
    if (toc.page) {
      toc.page = markdownToc(await getContent(input))
        .json.filter(i => i.lvl <= 2)
    }

    if (toc.folder) {
      toc.folder = items
        // only want children items that have an input
        .filter(item => item.input)
        // reduced data, since we don't need everything
        .map(item => ({
          title: item.title,
          description: item.description,
          url: item.url,
        }))
    }
  }

  // dont keep empty arrays
  if (!toc.page || !toc.page.length) delete toc.page
  if (!toc.folder || !toc.folder.length) delete toc.folder

  return toc
}

async function hydrateTree (tree, config, opts = {}) {
  const sitemap = new Sitemap()

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
      title: metaData.title || (
        itemParent.path !== undefined
          // convert the file path into the title
          ? ourpath.titlify(hoistedItem.path)
          // use the project name as the title if we are at the root
          : config.name
      ),
      url: ourpath.routify(
        syspath.resolve(
          '/', // don't resolve from the cwd
          itemParent.url || itemParent.path || config.baseURL,
          metaData.url || path_relative,
        )
      ),
    }

    if (metaData.draft && !opts.includeDrafts) {
      return
    }

    // add these items from metadata, but only if not undefined
    if (metaData.hidden) hydratedItem.hidden = true
    if (metaData.description) hydratedItem.description = metaData.description
    if (metaData.tags) hydratedItem.tags = metaData.tags.split(',').map(i => i.trim())
    if (metaData.related) hydratedItem.related = metaData.related.map(url => ({ title: ourpath.titlify(url), url }))

    // continue the breadcrumb from parent
    if (config.breadcrumbs && metaData.breadcrumbs !== false) {
      const breadcrumb = { title: hydratedItem.title }

      const breadcrumbs = []
      const breadcrumbsParent = itemParent.breadcrumbs || []

      if (hoistedItem.type === 'file') {
        breadcrumb.url = hydratedItem.url
      }

      breadcrumbsParent
        .concat(breadcrumb)
        // only add unique urls to the breadcrumb
        .forEach(crumb =>
          breadcrumbs.findIndex(i => i.url === crumb.url) === -1 &&
          breadcrumbs.push(crumb)
        )

      hydratedItem.breadcrumbs = breadcrumbs
    }

    // only files should have an input and output value
    if (hoistedItem.type === 'file') {
      hydratedItem.input = hoistedItem.path
      hydratedItem.outputDir = syspath.join(config.output, hydratedItem.url)

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
        // add url to the sitemap
        sitemap.addUrl(`${config.domain}${hydratedItem.url}`, {
          ...metaData.sitemap,
          filename: hoistedItem.path,
        })
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
      .filter(Boolean)
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

    // don't keep an empty items array
    if (!hydratedItem.items.length) {
      delete hydratedItem.items.length
    }

    // add table of contents, if applicable
    hydratedItem.toc = await tableOfContents(
      Object.assign({}, config.table_of_contents, metaData.table_of_contents),
      hydratedItem,
    )

    return hydratedItem
  }

  return {
    manifest: await _recursive(tree),
    sitemap: sitemap.generate(),
  }
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

module.exports = {
  getMetaData,
  normalizeItems,
  tableOfContents,
  hydrateTree,
  // hydrateContent,
}
