const fs = require('fs-extra')
const path = require('path')
const util = require('util')

const config = require('./config')
const renderTemplate = require('./lib/utils/render-template')
const expandComponentsTree = require('./lib/utils/expand-components-tree')
const serializeTree = require('./lib/utils/serialize-tree')

const BlogHeader = require('./lib/components/blog-header/blog-header.component')
const BlogArticle = require('./lib/components/blog-article/blog-article.component')

function renderHtmlFromTemplate (templatePath, templateData, componentsMap) {
  const indexTemplate = fs.readFileSync(templatePath, 'utf8')
  const indexHtml = renderTemplate(indexTemplate, templateData)
  const tree = expandComponentsTree(indexHtml, componentsMap)

  return serializeTree(tree)
}

function generateIndex () {
  const indexTemplatePath = path.resolve(__dirname, './index.html')
  const componentsMap = {
    [BlogHeader.componentName]: BlogHeader
  }

  const html = renderHtmlFromTemplate(indexTemplatePath, {}, componentsMap)

  //console.log(util.inspect(tree, { showHidden: false, depth: null }))

  fs.writeFileSync(`${ config.distDir }/index.html`, html)
}

function generateArticles () {
  const articleTemplatePath = path.resolve(__dirname, './article.html')
  const componentsMap = {
    [BlogArticle.componentName]: BlogArticle
  }

  fs.readdirSync(config.articlesDir)
    .filter((item) => {
      return fs.statSync(`${ config.articlesDir }/${ item }`).isDirectory()
    })
    .forEach((articleId) => {
      const html = renderHtmlFromTemplate(
        articleTemplatePath,
        { articleId },
        componentsMap
      )

      fs.writeFileSync(
        `${ config.distDir }/${ config.articlesPublicUrl }/` +
        `${ articleId }/index.html`,
        html
      )
    })
}

function copyArticles () {
  fs.copySync(
    config.articlesDir,
    `${ config.distDir }${ config.articlesPublicUrl }`
  )
}

function copyComponents () {
  fs.copySync(
    './lib/components',
    `${ config.distDir }${ config.componentsPublicUrl }`
  )
}

fs.ensureDirSync(config.distDir)

//generateIndex()
//copyComponents()
copyArticles()

generateArticles()

