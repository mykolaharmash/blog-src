const fs = require('fs-extra')
const path = require('path')
const { renderTemplate } = require('teig')

const config = require('../../config')
const collectComponentProperty = require('./collect-component-property')
const renderCustomComponent = require('./render-custom-component')

function renderPage (name, data, componentsMap) {
  const pageStylesUrl = `${ config.assetsPublicUrl }/pages/${ name }/${ name }.page.css`
  const globalStylesUrl = `${ config.assetsPublicUrl }/global/global.css`
  const template = fs.readFileSync(
    path.resolve(`./pages/${ name }/${ name }.page.html`),
    'utf8'
  )

  const componentsStyles = collectComponentProperty(componentsMap, 'styles')
  const pageData = Object.assign({
    title: config.title,
    description: config.description,
    author: config.author,
    url: config.url,
    rssUrl: config.rssPublicUrl,
    pageStylesUrl,
    globalStylesUrl,
    componentsStyles
  }, data)

  return renderTemplate(
    template,
    pageData,
    componentsMap,
    renderCustomComponent
  )
}

module.exports = renderPage
