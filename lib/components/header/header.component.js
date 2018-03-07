const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const renderStylesLink = require('../../helpers/render-styles-link')
const Link = require('../link/link.component')
const { pagesUrl } = require('../../config')

const TITLE = 'N.'
const HEADER_TEMPLATE = fs.readFileSync(path.join(__dirname, './header.component.html'), 'utf8')
const TITLE_TEXT_TEMPLATE = fs.readFileSync(path.join(__dirname, './title-text.html'), 'utf8')
const TITLE_LINK_TEMPLATE = fs.readFileSync(path.join(__dirname, './title-link.html'), 'utf8')

class Header {
  static get componentsMap () {
    return {
      'blog-link': Link
    }
  }

  static get styles () {
    return renderStylesLink('components/header/header.component.css')
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

    return renderTemplate(HEADER_TEMPLATE, {
      title,
      archiveUrl: `${ pagesUrl }/archive`
    }, Header.componentsMap)
  }
}

module.exports = Header
