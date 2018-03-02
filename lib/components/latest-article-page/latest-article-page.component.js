const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const readContentList = require('../../helpers/read-content-list')
const Header = require('../header/header.component')
const ArticleBody = require('../article-body/article-body.component')
const { articlesDir } = require('../../config')

const PAGE_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './latest-article-page.component.html'), 'utf8')

class LatestArticlePage {
  static get componentsMap () {
    return {
      'blog-header': Header,
      'article-body': ArticleBody
    }
  }

  render () {
    const latestArticle = readContentList(articlesDir)[0]

    return renderTemplate(
      PAGE_TEMPLATE,
      { articleId: latestArticle.id },
      LatestArticlePage.componentsMap
    )
  }
}

module.exports = LatestArticlePage
