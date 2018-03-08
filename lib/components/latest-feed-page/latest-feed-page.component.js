const fs = require('fs')
const path = require('path')

const readContentList = require('../../helpers/read-content-list')
const renderTemplate = require('../../helpers/render-template')
const renderStylesLink = require('../../helpers/render-styles-link')
const Header = require('../header/header.component')
const Movie = require('../movie/movie.component')
const Link = require('../link/link.component')
const HumanDate = require('../human-date/human-date.component')
const ArticleBody = require('../article-body/article-body.component')
const {
  articlesDir,
  moviesDir,
  pagesUrl
} = require('../../config')

const ROOT_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './latest-feed-page.component.html'), 'utf8')
const MOVIE_ITEM_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './movie-item.html'), 'utf8')
const ARTICLE_ITEM_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './article-item.html'), 'utf8')

class LatestFeedPage {
  static get componentsMap () {
    return {
      'blog-header': Header,
      'blog-movie': Movie,
      'blog-link': Link,
      'human-date': HumanDate,
      'article-body': ArticleBody
    }
  }

  static get styles () {
    return renderStylesLink('components/latest-feed-page/latest-feed-page.component.css')
  }

  readFeed () {
    return [
      ...readContentList(articlesDir),
      ...readContentList(moviesDir)
    ].sort((a, b) => {
      const aDate = new Date(a.metadata.publishDate)
      const bDate = new Date(b.metadata.publishDate)

      return aDate.getTime() < bDate.getTime()
    }).slice(0, 10)
  }

  renderMovieItem (movie) {
    return renderTemplate(MOVIE_ITEM_TEMPLATE, {
      id: movie.id,
      publishDate: movie.metadata.publishDate,
      verdict: movie.metadata.verdict || '',
      moviesUrl: `${ pagesUrl }/movies`
    })
  }

  renderArticleItem (article) {
    return renderTemplate(ARTICLE_ITEM_TEMPLATE, {
      id: article.id,
      title: article.metadata.title,
      publishDate: article.metadata.publishDate,
      archiveUrl: `${ pagesUrl }/archive`
    })
  }

  renderItems (feed) {
    return feed.map(item => {
      switch (item.type) {
        case 'movie': {
          return this.renderMovieItem(item)
        }
        case 'article': {
          return this.renderArticleItem(item)
        }
      }
    }).join('\n')
  }

  render () {
    const feed = this.readFeed()
    const items = this.renderItems(feed)
    const pageUrl = '/'

    return renderTemplate(
      ROOT_TEMPLATE,
      { items, pageUrl },
      LatestFeedPage.componentsMap
    )
  }
}

module.exports = LatestFeedPage

