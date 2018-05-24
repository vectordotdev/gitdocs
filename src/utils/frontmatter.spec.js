const { expect } = require('code')
const mockFs = require('mock-fs')
const fs = require('fs')
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

  describe('parseFrontmatter()', () => {
    it('normal', async () => {
      const res = await frontmatter.parseFrontmatter(fs.readFileSync('file1.md'))
      expect(res.data).to.equal({ foo: 'bar', baz: 'qux' })
      expect(res.content).to.equal('# Hello There')
    })

    it('with whitespace', async () => {
      const res = await frontmatter.parseFrontmatter(fs.readFileSync('file2.md'))
      expect(res.data).to.equal({ foo: 'bar' })
      expect(res.content).to.equal('# Hi')
    })

    it('without frontmatter', async () => {
      const res = await frontmatter.parseFrontmatter(fs.readFileSync('file3.md'))
      expect(res.data).to.equal({})
      expect(res.content).to.equal('# Hello There')
    })
  })

  describe('getFrontmatterOnly()', () => {
    it('normal', async () => {
      const data = await frontmatter.getFrontmatterOnly('file1.md')
      expect(data).to.equal({ foo: 'bar', baz: 'qux' })
    })

    it('with whitespace', async () => {
      const data = await frontmatter.getFrontmatterOnly('file2.md')
      expect(data).to.equal({ foo: 'bar' })
    })

    it('without frontmatter', async () => {
      const data = await frontmatter.getFrontmatterOnly('file3.md')
      expect(data).to.equal({})
    })
  })
})
