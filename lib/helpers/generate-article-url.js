const { blogUrl, articlesUrl } = require('../config')

/**
 * Generates absolute article URL based on
 * article id
 * @param {string} articleId
 * @returns {string}
 */
function generateArticleUrl (articleId) {
  return `${ blogUrl }${ articlesUrl }/${ articleId }`
}

module.exports = generateArticleUrl
