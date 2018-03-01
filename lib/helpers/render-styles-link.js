const { assetsUrl } = require('../config')

const GLOBAL_URL_PATTERN = /^http/

function renderStylesLink (url) {
  let href = url

  if (!GLOBAL_URL_PATTERN.test(url)) {
    href = `${ assetsUrl }/${ url }`
  }

  return `<link rel="stylesheet" href="${ href }">`
}

module.exports = renderStylesLink
