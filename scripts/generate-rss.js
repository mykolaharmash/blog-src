const fs = require('fs')
const path = require('path')
const { injectData, renderTemplate } = require('../../teig/index')
const html = require('html-escaper')

const config = require('../lib/config')
const readContentList = require('../lib/helpers/read-content-ids')
const renderArticle = require('../lib/helpers/render-markdown')
const Article = require('../lib/components/article-body/article-body.component')

const CHANNEL_TEMPLATE = fs.readFileSync(path.join(__dirname, './lib/rss-templates/channel.xml'), 'utf8')
const ITEM_TEMPLATE = fs.readFileSync(path.join(__dirname, './lib/rss-templates/item.xml'), 'utf8')

const distDir = process.argv[2] || config.distDir

function generateItem (articleId) {
  const articleUrl = `${ config.blogUrl }${ config.articlesUrl }/${ articleId }`
  const article = renderArticle(articleId, Object.keys(Article.componentsMap))
  const articleHtml = renderTemplate(
    article.html,
    { articleUrl },
    Article.componentsMap
  )

  return injectData(ITEM_TEMPLATE, {
    title: article.metadata.title,
    link: `${ config.blogUrl }${ config.articlesUrl }/${ articleId }`,
    description: html.escape(articleHtml),
    author: config.author,
    guid: articleId,
    pubDate: (new Date(article.metadata.publishDate)).toUTCString(),
    sourceUrl: `${ config.blogUrl }${ config.rssUrl }`
  })
}

function generate () {
  const articleIds = readContentList(config.articlesDir)

  const items = articleIds.map(generateItem).join('\n')

  return injectData(CHANNEL_TEMPLATE, {
    title: config.title,
    description: config.description,
    link: config.blogUrl,
    items
  })
}

const rss = generate()

fs.writeFileSync(`${ distDir }/${ config.rssUrl }`, rss)

