const { minify } = require('html-minifier')

class Sitemap {
  constructor () {
    this.urls = []
  }

  addUrl (url, data = {}) {
    const merged = Object.assign({}, {
      loc: url,
      priority: 0.5,
      changefreq: null,
      lastmod: null,
    }, data)

    this.urls.push(merged)
  }

  generate () {
    return minify(`
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${this.urls.map(data => `
          <url>
            ${data.loc ? `<loc>${data.loc}</loc>` : ''}
            ${data.lastmod ? `<lastmod>${data.lastmod}</lastmod>` : ''}
            ${data.changefreq ? `<changefreq>${data.changefreq}</changefreq>` : ''}
            ${data.priority ? `<priority>${data.priority}</priority>` : ''}
          </url>
        `).join('\n')}
      </urlset>
    `, {
      collapseWhitespace: true,
    })
  }
}

module.exports = Sitemap
