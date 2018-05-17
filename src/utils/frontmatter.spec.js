const { expect } = require('chai')
const mockFs = require('mock-fs')
const frontmatter = require('./frontmatter')

describe('unit: utils/frontmatter', () => {
  afterEach(mockFs.restore)
  beforeEach(() => mockFs({
    'file1.md': `---
foo: bar
baz: qux
---
# Hello There
    `,
    'file2.md': `
---
foo: bar
---
# Hi
    `,
    'file3.md': `
# Hello There
    `,
  }))

  describe('getFrontmatter()', () => {
    it('normal', async () => {
      const data = await frontmatter.getFrontmatter('file1.md')
      expect(data).to.deep.equal({ foo: 'bar', baz: 'qux' })
    })

    it('with whitespace', async () => {
      const data = await frontmatter.getFrontmatter('file2.md')
      expect(data).to.deep.equal({ foo: 'bar' })
    })

    it('without frontmatter', async () => {
      const data = await frontmatter.getFrontmatter('file3.md')
      expect(data).to.deep.equal({})
    })
  })

  describe('getFrontmatterWithContent()', () => {
    it('normal', async () => {
      const res = await frontmatter.getFrontmatterWithContent('file1.md')
      expect(res.data).to.deep.equal({ foo: 'bar', baz: 'qux' })
      expect(res.content).to.equal('# Hello There')
    })

    it('with whitespace', async () => {
      const res = await frontmatter.getFrontmatterWithContent('file2.md')
      expect(res.data).to.deep.equal({ foo: 'bar' })
      expect(res.content).to.equal('# Hi')
    })

    it('without frontmatter', async () => {
      const res = await frontmatter.getFrontmatterWithContent('file3.md')
      expect(res.data).to.deep.equal({})
      expect(res.content).to.equal('# Hello There')
    })
  })
})
