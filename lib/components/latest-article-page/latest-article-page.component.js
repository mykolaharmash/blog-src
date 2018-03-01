const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const readContentList = require('../../helpers/read-content-list')
const Header = require('../header/header.component')
const MarkdownArticle = require('../markdown-article/markdown-article.component')
const { articlesDir } = require('../../config')

const PAGE_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './latest-article-page.component.html'), 'utf8')

class LatestArticlePage {
  static get componentsMap () {
    return {
      'blog-header': Header,
      'markdown-article': MarkdownArticle
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
