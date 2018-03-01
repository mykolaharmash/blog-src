const renderTemplate = require('../../helpers/render-template')
const LatestArticlePage = require('../latest-article-page/latest-article-page.component')
const LatestFeedPage = require('../latest-feed-page/latest-feed-page.component')
const ArticlePage = require('../article-page/article-page.component')
const ArchivePage = require('../archive-page/archive-page.component')

class Page {
  static get LATEST_FEED () { return 'latest-feed-page' }
  static get ARTICLE () { return 'article-page' }
  static get ARCHIVE () { return 'archive-page' }

  static get componentsMap () {
    return {
      'latest-feed-page': LatestFeedPage,
      'latest-article-page': LatestArticlePage,
      'article-page': ArticlePage,
      'archive-page': ArchivePage
    }
  }

  getPageTemplate (pageId, pageData) {
    switch (pageId) {
      case Page.LATEST_FEED: {
        return this.renderLatestFeedPage(pageData)
      }

      case Page.ARTICLE: {
        return this.renderArticlePage(pageData)
      }

      case Page.ARCHIVE: {
        return this.renderArchivePage(pageData)
      }

      default:
        throw new Error(`Unknown page id "${ pageId }"`)
    }
  }

  renderLatestFeedPage () {
    return '<latest-feed-page></latest-feed-page>'
  }

  renderArticlePage ({ articleId }) {
    return `<article-page id="${ articleId }"></article-page>`
  }

  renderArchivePage () {
    return '<archive-page></archive-page>'
  }

  render (attrs) {
    const pageId = attrs['page-id']
    let pageData = {}

    if (pageId === undefined) {
      throw new Error('"page-id" attribute was not provided')
    }
    if (attrs['page-data'] !== undefined) {
      pageData = JSON.parse(attrs['page-data'])
    }

    const pageTemplate = this.getPageTemplate(pageId, pageData)

    return renderTemplate(
      pageTemplate,
      {},
      Page.componentsMap
    )
  }
}

module.exports = Page
