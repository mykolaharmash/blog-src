const fs = require('fs-extra')

const config = require('../lib/config')
const readContentIds = require('../lib/helpers/read-content-ids')
const renderPage = require('../lib/helpers/render-page')
const Page = require('../lib/components/page/page.component')
const ArchivePage = require('../lib/components/archive-page/archive-page.component')

const distDir = process.argv[2] || config.distDir

function generateIndexPage () {
  const html = renderPage(Page.LATEST_FEED, config.blogUrl)

  fs.writeFileSync(`${ distDir }/index.html`, html)
}

function generateArchivePage () {
  const canonicalUrl = `${ config.blogUrl }${ ArchivePage.pageUrl }`
  const pagePath = `${ distDir }${ ArchivePage.pageUrl }`
  const html = renderPage(Page.ARCHIVE, canonicalUrl)

  fs.ensureDirSync(pagePath)
  fs.writeFileSync(`${ pagePath }/index.html`, html)
}

function generateArticlePages () {
  const articleIds = readContentIds(config.articlesDir)

  articleIds.forEach(articleId => {
    fs.copySync(
      `${ config.articlesDir }/${ articleId }`,
      `${ distDir }/${ config.articlesUrl }/${ articleId }`
    )
    const canonicalUrl = `${ config.blogUrl }${ config.articlesUrl }/${ articleId }`

    const html = renderPage(Page.ARTICLE, canonicalUrl, { articleId })

    fs.writeFileSync(
      `${ distDir }/${ config.articlesUrl }/` +
      `${ articleId }/index.html`,
      html
    )
  })
}

function generateMoviesPage () {
  fs.copySync(config.moviesDir, `${ distDir }${ config.assetsUrl }/movies`)
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
generateMoviesPage()
