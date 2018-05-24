const syspath = require('path')
const { expect } = require('code')
const { run } = require('./helpers')

describe('integration: manifest', () => {
  const cwd = `${__dirname}/mock`

  it('generates correct manifest object', async () => {
    const { stdout } = await run('manifest', { cwd })
    const res = JSON.parse(stdout)
    console.log(res)
    expect(res.path).to.equal('')
    expect(res.draft).to.be.false()
    expect(res.title).to.equal('Mock')
    expect(res.url).to.equal('/')
    expect(res.input).to.equal(syspath.resolve(__dirname, 'mock/readme.md'))
    expect(res.outputDir).to.equal('.gitdocs_build/')
    expect(res.items[0].path).to.equal('foo')
    expect(res.items[0].draft).to.be.false()
    expect(res.items[0].title).to.equal('The Foo')
    expect(res.items[0].url).to.equal('/foo/')
    expect(res.items[0].input).to.equal(syspath.resolve(__dirname, 'mock/foo/index.md'))
    expect(res.items[0].outputDir).to.equal('.gitdocs_build/foo/')
    expect(res.items[0].items).to.have.length(3)
  })
})
