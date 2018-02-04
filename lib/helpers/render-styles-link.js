const { assetsUrl } = require('../config')

function renderStylesLink (url) {
  return `<link rel="stylesheet" href="${ assetsUrl }/${ url }">`
}

module.exports = renderStylesLink
