const fs = require('fs-extra')
const path = require('path')

const renderTemplate = require('../helpers/render-template')
const config = require('../config')
const collectComponentProperty = require('./collect-component-property')
const Page = require('../components/page/page.component')

const componentsMap = { 'blog-page': Page }
const CWD = process.cwd()

function stringifyStylesMap (stylesMap) {
  return Object.values(stylesMap).join('')
}

function renderPage (pageId, canonicalUrl, pageData = {}) {
  const template = fs.readFileSync(path.resolve(CWD, './lib/index.html'), 'utf8')

  const componentsStylesMap = collectComponentProperty(componentsMap, 'styles')
  const componentsStyles = stringifyStylesMap(componentsStylesMap)

  const data = {
    title: config.title,
    description: config.description,
    author: config.author,
    blogUrl: config.blogUrl,
    rssUrl: config.rssUrl,
    componentsStyles,
    pageId,
    canonicalUrl,
    pageData: JSON.stringify(pageData)
  }

  return renderTemplate(template, data, componentsMap)
}

module.exports = renderPage
