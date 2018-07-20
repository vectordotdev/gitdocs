const { getContent } = require('./filesystem')

async function generateDatabase (manifest) {
  const db = []

  const _recursive = async ({ items, ...item }) => {
    if (item.input) {
      db.push({
        url: item.url,
        title: item.title,
        tags: item.tags,
        related: item.related,
        breadcrumbs: item.breadcrumbs,
        content: await getContent(item.input),
      })
    }

    if (items) {
      await Promise.all(
        items.map(i => _recursive(i))
      )
    }
  }

  await _recursive(manifest)
  return db
}

module.exports = {
  generateDatabase,
}
