const { slugify } = require('../utils/path')

module.exports = (config, externals) => {
  externals.forEach(e => {
    const order = Object
      .keys(e.config.order || {})
      .map(k => ({
        [`/${slugify(e.name)}${k}`]: e.config.order[k]
      }))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {})
    config.order = { ...order, ...config.order }
  })

  return config
}
