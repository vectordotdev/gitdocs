const { expect } = require('code')
const { run } = require('./helpers')

describe('integration: help', () => {
  it('shows help menu with command', async () => {
    const res = await run('help')
    expect(res.stdout).to.match(/usage/)
  })

  it('shows help submenu with command', async () => {
    const res = await run('help build')
    expect(res.stdout).to.match(/gitdocs build/)
  })

  it('shows help submenu with flag', async () => {
    const res = await run('build -h')
    expect(res.stdout).to.match(/gitdocs build/)
  })
})
