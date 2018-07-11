const { expect } = require('code')
const path = require('./path')

describe('unit: utils/path', () => {
  it('escapeForRegex()', async () => {
    expect(path.escapeForRegex('foo.bar')).to.equal('foo\\.bar')
  })

  it('removeExt()', async () => {
    expect(path.removeExt('foo.md')).to.equal('foo')
    expect(path.removeExt('foo/bar.md')).to.equal('foo/bar')
    expect(path.removeExt('foo')).to.equal('foo')
  })

  it('removeIndex()', async () => {
    expect(path.removeIndex('foo/index')).to.equal('foo/')
    expect(path.removeIndex('foo/readme')).to.equal('foo/')
    expect(path.removeIndex('foo/index.md')).to.equal('foo/')
    expect(path.removeIndex('foo/readme.md')).to.equal('foo/')
    expect(path.removeIndex('foo/index-test')).to.equal('foo/index-test')
    expect(path.removeIndex('foo/readme-test')).to.equal('foo/readme-test')
    expect(path.removeIndex('foo')).to.equal('foo')
    expect(path.removeIndex('foo/bar')).to.equal('foo/bar')
    expect(path.removeIndex('foo/bar.md')).to.equal('foo/bar.md')
  })

  it('removeSlashes()', async () => {
    expect(path.removeSlashes('/foo/bar/')).to.equal('foo/bar')
    expect(path.removeSlashes('foo/bar/')).to.equal('foo/bar')
    expect(path.removeSlashes('/foo/bar')).to.equal('foo/bar')
    expect(path.removeSlashes('foo/bar')).to.equal('foo/bar')
  })

  it('titlify()', async () => {
    expect(path.titlify('foo')).to.equal('Foo')
    expect(path.titlify('foo-bar')).to.equal('Foo Bar')
    expect(path.titlify('foo-bar.md')).to.equal('Foo Bar')
    expect(path.titlify('foo/bar/baz-qux.md')).to.equal('Baz Qux')
    expect(path.titlify('/foo-bar/')).to.equal('Foo Bar')
    expect(path.titlify('/foo-bar/index')).to.equal('Foo Bar')
    expect(path.titlify('/foo-bar/index.md')).to.equal('Foo Bar')
    expect(path.titlify('/foo-bar/baz-qux')).to.equal('Baz Qux')
    expect(path.titlify('/foo-bar/baz-qux/')).to.equal('Baz Qux')
  })

  it('routify()', async () => {
    expect(path.routify('foo bar')).to.equal('/foo-bar/')
    expect(path.routify('Foo Bar/Baz')).to.equal('/foo-bar/baz/')
    expect(path.routify('foo/bar')).to.equal('/foo/bar/')
    expect(path.routify('foo/bar.md')).to.equal('/foo/bar/')
    expect(path.routify('/foo/bar')).to.equal('/foo/bar/')
    expect(path.routify('/foo/bar/index')).to.equal('/foo/bar/')
    expect(path.routify('/foo/bar/index.md')).to.equal('/foo/bar/')
    expect(path.routify('/foo/bar/index.html')).to.equal('/foo/bar/')
    expect(path.routify('/foo/bar/baz.md')).to.equal('/foo/bar/baz/')
    expect(path.routify('/foo/bar/')).to.equal('/foo/bar/')
    expect(path.routify('foo')).to.equal('/foo/')
    expect(path.routify('/')).to.equal('/')
    expect(path.routify('')).to.equal('/')
  })
})
