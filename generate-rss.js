const fs = require('fs')
const path = require('path')
const { injectData, renderTemplate } = require('teig')
const html = require('html-escaper')

const config = require('./config')
const readArticlesList = require('./lib/helpers/read-articles-list')
const renderArticle = require('./lib/helpers/render-article')
const Article = require('./lib/components/article/article.component')

const CHANNEL_TEMPLATE = fs.readFileSync(path.join(__dirname, './lib/rss-templates/channel.xml'), 'utf8')
const ITEM_TEMPLATE = fs.readFileSync(path.join(__dirname, './lib/rss-templates/item.xml'), 'utf8')

const distDir = process.argv[2] || config.distDir

function generateItem (articleId) {
  const articleUrl = `${ config.url }${ config.articlesPublicUrl }/${ articleId }`
  const article = renderArticle(articleId, Object.keys(Article.componentsMap))
  const articleHtml = renderTemplate(
    article.html,
    { articleUrl },
    Article.componentsMap
  )

  return injectData(ITEM_TEMPLATE, {
    title: article.metadata.title,
    link: `${ config.url }${ config.articlesPublicUrl }/${ articleId }`,
    description: html.escape(articleHtml),
    author: config.author,
    guid: articleId,
    pubDate: (new Date(article.metadata.publishDate)).toUTCString(),
    sourceUrl: `${ config.url }${ config.rssPublicUrl }`
  })
}

function generate () {
  const articleIds = readArticlesList()

  const items = articleIds.map(generateItem).join('\n')

  return injectData(CHANNEL_TEMPLATE, {
    title: config.title,
    description: config.description,
    link: config.url,
    items
  })
}

const rss = generate()

fs.writeFileSync(`${ distDir }/${ config.rssPublicUrl }`, rss)

