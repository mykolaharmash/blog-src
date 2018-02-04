const fs = require('fs-extra')

const config = require('./config')
const readArticlesIds = require('./lib/helpers/read-articles-ids')
const renderPage = require('./lib/helpers/render-page')

const Header = require('./lib/components/header/header.component')
const Article = require('./lib/components/article/article.component')
const ArticlesList = require('./lib/components/articles-list/articles-list.component')

const distDir = process.argv[2] || config.distDir

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

const articleIds = readArticlesIds()

generateIndexPage(articleIds)
generateArticlePages(articleIds)
