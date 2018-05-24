import { Search as JsSearch } from 'js-search'

// Create search instance for indexed doc search
export function createDB ({ ref, indices, items }) {
  const db = new JsSearch('url')
  indices.forEach(i => {
    db.addIndex(i)
  })
  db.addDocuments(items)
  return db
}
