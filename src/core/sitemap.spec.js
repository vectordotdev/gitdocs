const { expect } = require('code')
const Sitemap = require('./sitemap')

describe('unit: core/sitemap', () => {
  it('Sitemap()', async () => {
    const sitemap = new Sitemap()
    sitemap.addUrl('/foo')
    sitemap.addUrl('/bar', { priority: 1 })
    sitemap.addUrl('/baz', { changefreq: 'daily' })
    expect(sitemap.generate()).to.equal('<?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>/foo</loc><priority>0.5</priority></url><url><loc>/bar</loc><priority>1</priority></url><url><loc>/baz</loc><changefreq>daily</changefreq><priority>0.5</priority></url></urlset>')
  })

  it('Sitemap() duplicated url', async () => {
    const sitemap = new Sitemap()
    sitemap.addUrl('/foo')
    expect(() => sitemap.addUrl('/foo')).to.throw(Error)
  })
})
