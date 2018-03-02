const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const renderMarkdown = require('../../helpers/render-markdown')
const renderStylesLink = require('../../helpers/render-styles-link')
const Header = require('../header/header.component')
const HumanDate = require('../human-date/human-date.component')
const ArticleBody = require('../article-body/article-body.component')
const { articlesDir } = require('../../config')

const PAGE_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './article-page.component.html'), 'utf8')

class ArticlePage {
  static get componentsMap () {
    return {
      'blog-header': Header,
      'article-body': ArticleBody,
      'human-date': HumanDate
    }
  }

  static get styles () {
    return renderStylesLink('components/article-page/article-page.component.css')
  }

  render (attrs) {
    const id = attrs['id']
    const mdPath = `${ articlesDir }/${ id }/${ id }.md`
    const { metadata } = renderMarkdown(mdPath)

    return renderTemplate(
      PAGE_TEMPLATE,
      {
        articleId: id,
        title: metadata.title,
        publishDate: metadata.publishDate
      },
      ArticlePage.componentsMap
    )
  }
}

module.exports = ArticlePage
