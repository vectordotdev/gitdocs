const { expect } = require('code')
const robots = require('./robots')

describe('unit: core/robots', () => {
  it('getRobotsTxt()', async () => {
    expect(robots.getRobotsTxt()).to.equal('User-agent: *\nSitemap: /sitemap.xml\nDisallow: /')
    expect(robots.getRobotsTxt({
      domain: 'https://foo.bar',
      crawlable: true,
    })).to.equal('User-agent: *\nSitemap: https://foo.bar/sitemap.xml\nDisallow: ')
  })
})
