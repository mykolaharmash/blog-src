/**
 * Reads list of content items (like articles,
 * movies, etc.) within provided directory,
 * parses metadata for each item.
 * Returns list of metadata sorted by date
 * from new to old
 */

const readContentIds = require('./read-content-ids')
const renderMarkdown = require('./render-markdown')
const { articlesDir, moviesDir } = require('../config')

function renderArticle (id) {
  const mdPath = `${ articlesDir }/${ id }/${ id }.md`
  const { metadata } = renderMarkdown(mdPath)

  return { metadata, id, type: 'article' }
}

function renderMovie (id) {
  const mdPath = `${ moviesDir }/${ id }/${ id }.movie.md`
  const { metadata } = renderMarkdown(mdPath)

  return { metadata, id, type: 'movie' }
}

const renderItemMap = {
  [articlesDir]: renderArticle,
  [moviesDir]: renderMovie
}


function readContentList (contentItemsDir) {
  const ids = readContentIds(contentItemsDir)
  const renderItem = renderItemMap[contentItemsDir]

  if (renderItem === undefined) {
    throw new Error(
      `No renderer was found for items in "${ contentItemsDir }"`
    )
  }

  return ids
    .map(id => renderItem(id))
    .sort((a, b) => {
      const aDate = new Date(a.metadata.publishDate)
      const bDate = new Date(b.metadata.publishDate)

      return aDate.getTime() < bDate.getTime()
    })
}

module.exports = readContentList


