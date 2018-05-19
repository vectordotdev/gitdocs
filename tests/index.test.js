const { expect } = require('code')
const { run } = require('./helpers')

describe('integration: index', () => {
  it('defaults to help command', async () => {
    const res = await run()
    expect(res.stdout).to.match(/usage/)
  })

  it('shows package version', async () => {
    const res = await run('-v')
    expect(res.stdout).to.match(/v[0-9]/)
  })

  it('throws on invalid command', async () => {
    const res = await run('foobar', true)
    expect(res.code).to.equal(1)
    expect(res.stderr).to.match(/not a valid/)
  })
})
