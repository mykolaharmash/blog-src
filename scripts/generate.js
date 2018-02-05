const fs = require('fs-extra')

const config = require('../lib/config')
const readArticlesIds = require('../lib/helpers/read-articles-ids')
const renderPage = require('../lib/helpers/render-page')
const Page = require('../lib/components/page/page.component')

const distDir = process.argv[2] || config.distDir

function generateIndexPage () {
  const html = renderPage(Page.INDEX, config.blogUrl)

  fs.writeFileSync(`${ distDir }/index.html`, html)
}

function generateArchivePage () {
  const pageUrl = `${ config.blogUrl }${ config.pagesUrl }/archive`
  const pagePath = `${ distDir }${ config.pagesUrl }/archive`
  const html = renderPage(Page.ARCHIVE, pageUrl)

  fs.ensureDirSync(pagePath)
  fs.writeFileSync(`${ pagePath }/index.html`, html)
}

function generateArticlePages () {
  const articleIds = readArticlesIds()

  articleIds.forEach(articleId => {
    fs.copySync(
      `${ config.articlesDir }/${ articleId }`,
      `${ distDir }/${ config.articlesUrl }/${ articleId }`
    )
    const articleUrl = `${ config.blogUrl }${ config.articlesUrl }/${ articleId }`

    const html = renderPage(Page.ARTICLE, articleUrl, { articleId })

    fs.writeFileSync(
      `${ distDir }/${ config.articlesUrl }/` +
      `${ articleId }/index.html`,
      html
    )
  })
}

function copyAssets () {
  fs.copySync(
    './lib/components',
    `${ distDir }${ config.assetsUrl }/components`
  )
}

function copyCname () {
  fs.copySync('./CNAME', `${ distDir }/CNAME`)
}

fs.ensureDirSync(distDir)

copyAssets()
copyCname()

generateIndexPage()
generateArticlePages()
generateArchivePage()
