export function getDocPath (path, root = '/docs') {
  return path.split(`${root}`)[1].replace('.md', '').toLowerCase()
}
