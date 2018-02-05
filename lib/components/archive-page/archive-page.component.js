const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const renderStylesLink = require('../../helpers/render-styles-link')
const ArticlesArchive = require('../articles-archive/articles-archive.component')

const PAGE_TEMPLATE = fs.readFileSync(path.join(__dirname, './archive-page.component.html'), 'utf8')

class ArchivePage {
  static get componentsMap () {
    return {
      'articles-archive': ArticlesArchive
    }
  }

  render ()  {
    return renderTemplate(PAGE_TEMPLATE, {}, ArchivePage.componentsMap)
  }
}

module.exports = ArchivePage
