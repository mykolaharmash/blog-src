const path = require('path')
const fs = require('fs')
const { renderTemplate } = require('teig')

const { assetsUrl } = require('../../config')

const ARTICLE_IMAGE_TEMPLATE = fs.readFileSync(path.join(__dirname, './article-image.component.html'), 'utf8')
const STYLES_TEMPLATE = fs.readFileSync(path.join(__dirname, './styles.html'), 'utf8')

class ArticleImage {
  static get styles () {
    const data = {
      stylesUrl: `${ assetsUrl }/components/article-image/article-image.component.css`
    }

    return renderTemplate(STYLES_TEMPLATE, data)
  }

  render (attrs) {
    const templateData = {
      src: attrs.src,
      alt: attrs.alt,
      type: attrs.type || 'default'
    }

    return renderTemplate(ARTICLE_IMAGE_TEMPLATE, templateData)
  }
}

module.exports = ArticleImage
