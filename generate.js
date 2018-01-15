const fs = require('fs-extra')
const path = require('path')
const { renderTemplate } = require('teig')

const config = require('./config')
const readArticlesList = require('./lib/helpers/read-articles-list')
const renderCustomComponent = require('./lib/helpers/render-custom-component')

const Header = require('./lib/components/header/header.component')
const Article = require('./lib/components/article/article.component')
const ArticlesList = require('./lib/components/articles-list/articles-list.component')

const distDir = process.argv[2] || config.distDir

function collectComponentProperty (componentsMap, propertyKey) {
  return Object
    .values(componentsMap)
    .reduce((result, component) => {
      if (component[propertyKey] !== undefined) {
        result += component[propertyKey]
      }

      if (component.componentsMap !== undefined) {
        result += collectComponentProperty(component.componentsMap, propertyKey)
      }

      return result
    }, '')
}

function renderPage (name, data, componentsMap) {
  const pageStylesUrl = `${ config.assetsPublicUrl }/pages/${ name }/${ name }.page.css`
  const globalStylesUrl = `${ config.assetsPublicUrl }/global/global.css`
  const template = fs.readFileSync(
    path.join(__dirname, `./pages/${ name }/${ name }.page.html`),
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

function generateIndexPage (articleIds) {
  const componentsMap = {
    'blog-header': Header,
    'articles-list': ArticlesList
  }
  const html = renderPage('index', {
    articleIds: JSON.stringify(articleIds),
  }, componentsMap)

  fs.writeFileSync(`${ distDir }/index.html`, html)
}

function generateArticlePages (articleIds) {
  const componentsMap = {
    'blog-header': Header,
    'markdown-article': Article
  }

  articleIds.forEach((articleId) => {
    fs.copySync(
      `${ config.articlesDir }/${ articleId }`,
      `${ distDir }/${ config.articlesPublicUrl }/${ articleId }`
    )
    const url = `${ config.url }${ config.articlesPublicUrl }/${ articleId }`

    const html = renderPage('article', { articleId, url }, componentsMap)

    fs.writeFileSync(
      `${ distDir }/${ config.articlesPublicUrl }/` +
      `${ articleId }/index.html`,
      html
    )
  })
}

function copyAssets () {
  fs.copySync(
    './global-assets',
    `${ distDir }${ config.assetsPublicUrl }/global`
  )
  fs.copySync(
    './pages',
    `${ distDir }${ config.assetsPublicUrl }/pages`
  )
  fs.copySync(
    './lib/components',
    `${ distDir }${ config.assetsPublicUrl }/components`
  )
}

function copyCname () {
  fs.copySync('./CNAME', `${ distDir }/CNAME`)
}

fs.ensureDirSync(distDir)

copyAssets()
copyCname()

const articleIds = readArticlesList()

generateIndexPage(articleIds)
generateArticlePages(articleIds)
