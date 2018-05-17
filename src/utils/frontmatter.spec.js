const { expect } = require('chai')
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

describe('unit: utils/frontmatter', () => {
  afterEach(mockFs.restore)
  beforeEach(() => mockFs({
    'file1.md': markdown1,
    'file2.md': markdown2,
    'file3.md': markdown3,
  }))

  describe('getFrontmatter()', () => {
    it('normal', async () => {
      const data = await frontmatter.getFrontmatter('file1.md')
      const withContent = await frontmatter.getFrontmatterWithContent('file1.md')
      expect(data).to.deep.equal({ foo: 'bar', baz: 'qux' })
      expect(withContent.content).to.equal('# Hello There')
    })

    it('with whitespace', async () => {
      const data = await frontmatter.getFrontmatter('file2.md')
      const withContent = await frontmatter.getFrontmatterWithContent('file2.md')
      expect(data).to.deep.equal({ foo: 'bar' })
      expect(withContent.content).to.equal('# Hi')
    })

    it('without frontmatter', async () => {
      const data = await frontmatter.getFrontmatter('file3.md')
      const withContent = await frontmatter.getFrontmatterWithContent('file3.md')
      expect(data).to.deep.equal({})
      expect(withContent.content).to.equal('# Hello There')
    })
  })

  it('getFrontmatterWithContent()')
})
