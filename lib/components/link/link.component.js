const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const renderStylesLink = require('../../helpers/render-styles-link')

const LINK_TEMPLATE = fs.readFileSync(path.join(__dirname, './link.component.html'), 'utf8')

class Link {
  static get styles () {
    return renderStylesLink(`components/link/link.component.css`)
  }

  render (attrs, innerHtml) {
    return renderTemplate(LINK_TEMPLATE, {
      href: attrs['href'] || '',
      text: innerHtml
    })
  }
}

module.exports = Link
