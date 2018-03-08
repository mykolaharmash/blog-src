const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const renderStylesLink = require('../../helpers/render-styles-link')
const Link = require('../link/link.component')
const { pagesUrl, assetsUrl } = require('../../config')

const TITLE = 'N.'
const NAVIGATION_ITEMS = [
  { title: 'Blog', href: `${ pagesUrl }/archive` }
]
const HEADER_TEMPLATE = fs.readFileSync(path.join(__dirname, './header.component.html'), 'utf8')

class Header {
  static get componentsMap () {
    return {
      'blog-link': Link
    }
  }

  static get styles () {
    return renderStylesLink('components/header/header.component.css')
  }

  renderLogo (pageUrl) {
    const logoUrl = `${ assetsUrl }/components/header/logo.svg`
    const logo = `<img src="${ logoUrl }" alt="Blog logo">`

    if (pageUrl === '/') {
      return `<div class="header__logo">${ logo }</div>`
    }

    return `<a class="header__logo" href="/">${ logo }</a>`
  }

  renderNavigationLink (href, title, pageUrl) {
    if (href === pageUrl) {
      return `<div class="header__navigation-item">${ title }</div>`
    }

    return `
      <div class="header__navigation-item">
        <blog-link href="${ href }">${ title }</blog-link>
      </div>
    `
  }

  renderNavigationItems (pageUrl) {
    return NAVIGATION_ITEMS.map(item => {
      return this.renderNavigationLink(item.href, item.title, pageUrl)
    }).join('\n')
  }

  render (attrs) {
    const pageUrl = attrs['page-url']
    const logo = this.renderLogo(pageUrl)
    const navigationItems = this.renderNavigationItems(pageUrl)

    return renderTemplate(HEADER_TEMPLATE, {
      logo,
      navigationItems
    }, Header.componentsMap)
  }
}

module.exports = Header
