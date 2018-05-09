import { Search as JsSearch } from 'js-search'

// Create search instance for indexed doc search
export function createDB ({ ref, indices, items }) {
  const db = new JsSearch('file')
  db.addIndex(indices)
  db.addDocuments(items)
  return db
}
