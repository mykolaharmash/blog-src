const fs = require('fs')
const path = require('path')
const { renderTemplate } = require('teig')

const { assetsPublicUrl } = require('../../../config')

const TITLE = 'N.'
const HEADER_TEMPLATE = fs.readFileSync(path.join(__dirname, './header.component.html'), 'utf8')
const TITLE_TEXT_TEMPLATE = fs.readFileSync(path.join(__dirname, './title-text.html'), 'utf8')
const TITLE_LINK_TEMPLATE = fs.readFileSync(path.join(__dirname, './title-link.html'), 'utf8')
const STYLES_TEMPLATE = fs.readFileSync(path.join(__dirname, './styles.html'), 'utf8')

class Header {
  static get styles () {
    const stylesUrl = `${ assetsPublicUrl }/components/header/header.component.css`

    return renderTemplate(STYLES_TEMPLATE, { stylesUrl })
  }

  renderTitle (attrs) {
    const titleData = { title: TITLE }

    if (attrs['parent-page-type'] === 'root') {
      return renderTemplate(TITLE_TEXT_TEMPLATE, titleData)
    }

    return renderTemplate(TITLE_LINK_TEMPLATE, titleData)
  }

  render (attrs) {
    const title = this.renderTitle(attrs)

    return renderTemplate(HEADER_TEMPLATE, { title })
  }
}

module.exports = Header
