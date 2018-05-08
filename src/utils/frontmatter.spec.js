const test = require('ava')
const mockFs = require('mock-fs')
const frontmatter = require('./frontmatter')

const markdown1 = `---
foo: bar
baz: qux
---
# Hello There
`

const markdown2 = `
---
foo: bar
---
# Hi
`

const markdown3 = '# Hello There'

test.before(() => mockFs({
  'file1.md': markdown1,
  'file2.md': markdown2,
  'file3.md': markdown3,
}))

test.after(mockFs.restore)

test('getFrontmatter', async t => {
  const data = await frontmatter.getFrontmatter('file1.md')
  const withContent = await frontmatter.getFrontmatterWithContent('file1.md')
  t.deepEqual(data, { foo: 'bar', baz: 'qux' })
  t.is(withContent.content, '# Hello There')
})

test('getFrontmatter (whitespace)', async t => {
  const data = await frontmatter.getFrontmatter('file2.md')
  const withContent = await frontmatter.getFrontmatterWithContent('file2.md')
  t.deepEqual(data, { foo: 'bar' })
  t.is(withContent.content, '# Hi')
})

test('getFrontmatter (no frontmatter)', async t => {
  const data = await frontmatter.getFrontmatter('file3.md')
  const withContent = await frontmatter.getFrontmatterWithContent('file3.md')
  t.deepEqual(data, {})
  t.is(withContent.content, '# Hello There')
})
