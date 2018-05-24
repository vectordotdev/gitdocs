const { expect } = require('code')
const template = require('./template')

describe('unit: core/template', () => {
  const entries = { main: { assets: ['file1.js', 'file2.js', 'file2.js.map'] } }

  it('getScriptTags()', async () => {
    expect(template.getScriptTags(entries)).to.equal('<script type="text/javascript" src="/file1.js"></script>\n<script type="text/javascript" src="/file2.js"></script>')
  })

  it('templateForDevelopment()', async () => {
    expect(template.templateForDevelopment(entries)).to.match(/gitdocs-app/)
  })

  it('templateForProduction()')
})
