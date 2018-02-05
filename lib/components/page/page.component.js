const renderTemplate = require('../../helpers/render-template')
const LatestArticlePage = require('../latest-article-page/latest-article-page.component')
const ArticlePage = require('../article-page/article-page.component')
const ArchivePage = require('../archive-page/archive-page.component')

class Page {
  static get INDEX () { return 'index-page' }
  static get ARTICLE () { return 'article-page' }
  static get ARCHIVE () { return 'archive-page' }

  static get componentsMap () {
    return {
      'latest-article-page': LatestArticlePage,
      'article-page': ArticlePage,
      'archive-page': ArchivePage
    }
  }

  getPageTemplate (pageId, pageData) {
    switch (pageId) {
      case Page.INDEX: {
        return this.renderIndexPage(pageData)
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

  renderIndexPage () {
    return '<latest-article-page></latest-article-page>'
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