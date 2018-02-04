/**
 * Reads list of all articles in the articles
 * directory, parses metadata for each article.
 * Returns list of metadatas sorted by date
 * from new to old
 */

const readArticlesIds = require('./read-articles-ids')
const renderArticle = require('./render-article')

function readArticlesList () {
  const ids = readArticlesIds()

  return ids
    .map(id => renderArticle(id))
    .map(({ metadata, id }) => ({ metadata, id }))
    .sort((a, b) => {
      const aDate = new Date(a)
      const bDate = new Date(b)

      return aDate.getTime() < bDate.getTime()
    })
}

module.exports = readArticlesList


