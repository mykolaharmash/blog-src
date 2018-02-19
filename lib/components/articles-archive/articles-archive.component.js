const fs = require('fs')
const path = require('path')

const readArticlesList = require('../../helpers/read-articles-list')
const renderStylesLink = require('../../helpers/render-styles-link')
const renderTemplate = require('../../helpers/render-template')
const { blogUrl, articlesUrl } = require('../../config')
const Link = require('../link/link.component')

const ROOT_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './articles-archive.component.html'), 'utf8')
const YEAR_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './year.html'), 'utf8')
const ARTICLE_ITEM_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './article-item.html'), 'utf8')

class ArticlesArchive {
  static get componentsMap () {
    return {
      'blog-link': Link
    }
  }

  static get styles () {
    return renderStylesLink('components/articles-archive/articles-archive.component.css')
  }

  groupArticlesByYear (articlesList) {
    const groups = {}

    articlesList.forEach(article => {
      const year = (new Date(article.metadata.publishDate)).getFullYear()

      if (groups[year] === undefined) {
        groups[year] = []
      }

      groups[year].push(article)
    })

    return groups
  }

  renderArticle (article) {
    const data = {
      url: `${ blogUrl }${ articlesUrl }/${ article.id }`,
      title: article.metadata.title
    }

    return renderTemplate(
      ARTICLE_ITEM_TEMPLATE,
      data,
      ArticlesArchive.componentsMap
    )
  }

  renderYear (year, articles) {
    const articlesList = articles
      .map(article => this.renderArticle(article))
      .join('\n')

    return renderTemplate(YEAR_TEMPLATE, { year, articlesList })
  }

  renderYears (groups) {
    return Object
      .keys(groups)
      .map(year => this.renderYear(year, groups[year]))
      .join('\n')
  }

  render () {
    const articlesList = readArticlesList()
    const groups = this.groupArticlesByYear(articlesList)
    const years = this.renderYears(groups)

    return renderTemplate(ROOT_TEMPLATE, { years })
  }
}

module.exports = ArticlesArchive

