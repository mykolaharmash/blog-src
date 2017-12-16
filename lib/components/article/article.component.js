const fs = require('fs')
const path = require('path')
const { renderTemplate } = require('site-generator')

const { assetsPublicUrl } = require('../../../config')
const renderArticle = require('../../utils/render-article')
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

  render (attrs) {
    const id = attrs['id']

    if (id === undefined) {
      throw new Error(
        'No "id" attribute was provided as for the component'
      )
    }

    const article = renderArticle(id, Object.keys(Article.componentsMap))

    const templateData = Object.assign({
      body: article.html
    }, article.metadata)

    return renderTemplate(
      ARTICLE_TEMPLATE,
      templateData,
      Article.componentsMap
    )
  }
}

module.exports = Article
