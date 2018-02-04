const fs = require('fs')
const path = require('path')

const {
  blogUrl,
  assetsUrl,
  articlesUrl
} = require('../../config')
const renderArticle = require('../../helpers/render-article')
const renderTemplate = require('../../helpers/render-template')
const ArticleImage = require('../article-image/article-image.component')
const CodeBlock = require('../code-block/code-block.component')
const ArticleLink = require('../article-link/article-link.component')

const STYLES_TEMPLATE = fs.readFileSync(path.join(__dirname, './styles.html'), 'utf8')
const ARTICLE_TEMPLATE = fs.readFileSync(path.join(__dirname, './markdown-article.component.html'), 'utf8')

class MarkdownArticle {
  static get componentsMap () {
    return {
      'article-image': ArticleImage,
      'code-block': CodeBlock,
      'article-link': ArticleLink
    }
  }

  static get styles () {
    const data = {
      stylesUrl: `${ assetsUrl }/components/markdown-article/markdown-article.component.css`
    }

    return renderTemplate(STYLES_TEMPLATE, data)
  }

  renderArticleSpecificStyles (styles = []) {
    return styles
      .map((stylesUrl) => {
        return renderTemplate(STYLES_TEMPLATE, { stylesUrl })
      })
      .join('')
  }

  render (attrs) {
    const id = attrs['id']

    if (id === undefined) {
      throw new Error(
        'No "id" attribute was provided'
      )
    }

    const article = renderArticle(id, Object.keys(MarkdownArticle.componentsMap))
    const articleSpecificStyles = this.renderArticleSpecificStyles(
      article.metadata.articleStyles
    )
    const articleUrl = `${ blogUrl }${ articlesUrl }/${ id }`

    const templateData = Object.assign({
      body: article.html,
      articleSpecificStyles,
      articleUrl
    }, article.metadata)

    return renderTemplate(
      ARTICLE_TEMPLATE,
      templateData,
      MarkdownArticle.componentsMap
    )
  }
}

module.exports = MarkdownArticle
