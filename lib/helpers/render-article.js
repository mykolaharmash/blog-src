const fs = require('fs')
const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkHtml = require('remark-html')
const visit = require('unist-util-visit')
const frontMatter = require('front-matter')

const { articlesDir } = require('../config')

/**
 * Set of custom tules for remark stringifier
 * see https://github.com/remarkjs/remark-html#integrations.
 * List of node types here https://github.com/syntax-tree/mdast
 */
function customClasses () {
  return function transformer (tree) {
    visit(tree, 'paragraph', (node) => {
      node.data = {
        hProperties: { className: 'article__paragraph' }
      }
    })

    visit(tree, 'heading', (node) => {
      if (node.depth === 2) {
        node.data = {
          hProperties: { className: 'article__section-title' }
        }
      }
    })

    visit(tree, 'list', (node) => {
      const className = node.ordered
        ? 'article__ordered-list'
        : 'article__unordered-list'

      node.data = {
        hProperties: { className }
      }
    })

    visit(tree, 'listItem', (node) => {
      node.data = {
        hProperties: { className: 'article__list-item' }
      }
    })

    visit(tree, 'link', (node) => {
      node.data = {
        hName: 'article-link'
      }
    })
  }
}

function renderArticle (id, customElementsList = []) {
  const path = `${ articlesDir }/${ id }/${ id }.md`
  const md = fs.readFileSync(path, 'utf8')

  const content = frontMatter(md)
  const metadata = content.attributes

  let html

  unified()
    .use(remarkParse, { blocks: customElementsList })
    .use(customClasses)
    .use(remarkHtml)
    .process(content.body, function (err, file) {
      if (err) {
        console.error(err)
      }

      html = file.toString()
    })

  if (!metadata.title || !metadata.publishDate) {
    console.log(
      `Article ${ path } is missing some metadata.\n` +
      'It should have "title" and "publishDate" properties.'
    )
  }

  return { html, metadata, id }
}

module.exports = renderArticle
