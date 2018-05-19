const { expect } = require('code')
const argv = require('./arguments')

describe('unit: utils/arguments', () => {
  describe('default()', () => {
    it('version', async () => {
      process.argv = ['', '', '-v']
      const res = argv()
      expect(res.v).to.be.true()
      expect(res.version).to.be.true()
      expect(res.cmd).to.equal('version')
    })

    it('version boolean', async () => {
      process.argv = ['', '', '--version', 'foo']
      const res = argv()
      expect(res.version).to.be.true()
    })

    it('help', async () => {
      process.argv = ['', '', '-h']
      const res = argv()
      expect(res.h).to.be.true()
      expect(res.help).to.be.true()
      expect(res.cmd).to.equal('help')
    })

    it('help command', async () => {
      process.argv = ['', '', 'foo', '-h']
      const res = argv()
      expect(res.cmd).to.equal('help')
    })

    it('default to help', async () => {
      process.argv = ['', '']
      const res = argv()
      expect(res.cmd).to.equal('help')
    })

    it('command', async () => {
      process.argv = ['', '', 'foo', 'bar']
      const res = argv()
      expect(res.cmd).to.equal('foo')
    })
  })
})
