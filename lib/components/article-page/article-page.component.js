const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const Header = require('../header/header.component')
const MarkdownArticle = require('../markdown-article/markdown-article.component')

const PAGE_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './article-page.component.html'), 'utf8')

class ArticlePage {
  static get componentsMap () {
    return {
      'blog-header': Header,
      'markdown-article': MarkdownArticle
    }
  }

  render (attrs) {
    return renderTemplate(
      PAGE_TEMPLATE,
      { articleId: attrs['id'] },
      ArticlePage.componentsMap
    )
  }
}

module.exports = ArticlePage
