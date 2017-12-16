const fs = require('fs-extra')
const util = require('util')

const config = require('./config')
const renderTemplate = require('./lib/utils/render-template')
const expandComponentsTree = require('./lib/utils/expand-components-tree')
const serializeTree = require('./lib/utils/serialize-tree')

const BlogHeader = require('./lib/components/blog-header/blog-header.component')

function generateIndex () {
  const componentsMap = {
    [BlogHeader.componentName]: BlogHeader
  }

  const indexTemplate = fs.readFileSync('./index.html', 'utf8')
  const indexHtml = renderTemplate(indexTemplate)
  const tree = expandComponentsTree(indexHtml, componentsMap)
  const html = serializeTree(tree)

  //console.log(util.inspect(tree, { showHidden: false, depth: null }))

  fs.writeFileSync(`${ config.distDir }/index.html`, html)
}

function generateArticles () {

}

function copyComponents () {
  fs.copySync(
    './lib/components',
    `${ config.distDir }${ config.componentsPublicUrl }`
  )
}

fs.ensureDirSync(config.distDir)

generateIndex()
copyComponents()

