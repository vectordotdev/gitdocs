const { routify } = require('../utils/path')

module.exports = (config, externals) => {
  externals.forEach(e => {
    console.log(routify(e.name))
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
