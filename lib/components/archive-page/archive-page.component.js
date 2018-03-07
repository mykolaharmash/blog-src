const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const renderStylesLink = require('../../helpers/render-styles-link')
const ArticlesArchive = require('../articles-archive/articles-archive.component')
const Header = require('../header/header.component')
const { pagesUrl } = require('../../config')

const PAGE_TEMPLATE = fs.readFileSync(path.join(__dirname, './archive-page.component.html'), 'utf8')

class ArchivePage {
  static get pageUrl () {
    return `${ pagesUrl }/archive`
  }

  static get componentsMap () {
    return {
      'articles-archive': ArticlesArchive,
      'blog-header': Header
    }
  }

  render ()  {
    return renderTemplate(
      PAGE_TEMPLATE,
      { pageUrl: ArchivePage.pageUrl },
      ArchivePage.componentsMap
    )
  }
}

module.exports = ArchivePage
