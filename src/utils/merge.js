const { routify } = require('./path')

function mergeExternalConfig (config, externals) {
  externals.forEach(e => {
    const order = Object
      .keys(e.config.order || {})
      .map(k => ({
        [`/${routify(e.name)}${k}`]: e.config.order[k]
      }))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {})
    config.order = { ...order, ...config.order }
  })

  return config
}

function mergeLeftByKey (items1, items2, opts = {}) {
  const merged = items1.map(item => {
    const itemSrc = items2.find(i => i[opts.key] === item[opts.key])

    return itemSrc
      ? { ...item, ...itemSrc }
      : item
  })

  const filtered = items2.filter(i =>
    items1.findIndex(j => j[opts.key] === i[opts.key]) === -1)

  switch (opts.strategy) {
    case 'replace':
      return merged

    case 'prepend':
      return merged.concat(filtered)

    case 'append':
      return filtered.concat(merged)

    default:
      if (filtered.length) {
        return filtered
      }
  }
}

module.exports = {
  mergeExternalConfig,
  mergeLeftByKey,
}
