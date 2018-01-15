const fs = require('fs')
const path = require('path')
const { renderTemplate } = require('teig')

const {
  url,
  assetsPublicUrl,
  articlesPublicUrl
} = require('../../../config')
const renderArticle = require('../../helpers/render-article')
const renderCustomComponent = require('../../helpers/render-custom-component')
const ArticleImage = require('../article-image/article-image.component')
const CodeBlock = require('../code-block/code-block.component')

const STYLES_TEMPLATE = fs.readFileSync(path.join(__dirname, './styles.html'), 'utf8')
const ARTICLE_TEMPLATE = fs.readFileSync(path.join(__dirname, './article.component.html'), 'utf8')

class Article {
  static get componentsMap () {
    return {
      'article-image': ArticleImage,
      'code-block': CodeBlock
    }
  }

  static get styles () {
    const data = {
      stylesUrl: `${ assetsPublicUrl }/components/article/article.component.css`
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
        'No "id" attribute was provided as for the component'
      )
    }

    const article = renderArticle(id, Object.keys(Article.componentsMap))
    const articleSpecificStyles = this.renderArticleSpecificStyles(
      article.metadata.articleStyles
    )
    const articleUrl = `${ url }${ articlesPublicUrl }/${ id }`

    const templateData = Object.assign({
      body: article.html,
      articleSpecificStyles,
      articleUrl
    }, article.metadata)

    return renderTemplate(
      ARTICLE_TEMPLATE,
      templateData,
      Article.componentsMap,
      renderCustomComponent
    )
  }
}

module.exports = Article
