function getRobotsTxt (config = {}) {
  const lines = [
    'User-agent: *',
    `Sitemap: ${config.domain || ''}/sitemap.xml`,
    `Disallow: ${config.crawlable ? '' : '/'}`,
  ]

  return lines.join('\n')
}

module.exports = {
  getRobotsTxt,
}
