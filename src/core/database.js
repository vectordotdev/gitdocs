const { getContent } = require('./filesystem')

async function generateDatabase (manifest) {
  const db = []

  const _recursive = async ({ items, ...item }, bc = []) => {
    if (item.input) {
      db.push({
        url: item.url,
        breadcrumb: bc,
        title: item.title,
        content: await getContent(item.input),
      })
    }

    if (items) {
      const breadcrumb = bc.concat(item.title)
      await Promise.all(
        items.map(i => _recursive(i, breadcrumb))
      )
    }
  }

  await _recursive(manifest)
  return db
}

module.exports = {
  generateDatabase,
}
