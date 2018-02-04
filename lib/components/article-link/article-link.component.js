const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const renderStylesLink = require('../../helpers/render-styles-link')

const LINK_TEMPLATE = fs.readFileSync(path.join(__dirname, './article-link.component.html'), 'utf8')

class ArticleLink {
  static get styles () {
    return renderStylesLink(`components/article-link/article-link.component.css`)
  }

  render (attrs, innerHtml) {
    return renderTemplate(LINK_TEMPLATE, {
      href: attrs['href'] || '',
      text: innerHtml
    })
  }
}

module.exports = ArticleLink
