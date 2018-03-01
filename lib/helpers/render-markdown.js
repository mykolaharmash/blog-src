const fs = require('fs')
const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkHtml = require('remark-html')
const visit = require('unist-util-visit')
const frontMatter = require('front-matter')

/**
 * Set of custom rules for remark stringifier
 * see https://github.com/remarkjs/remark-html#integrations.
 * List of node types here https://github.com/syntax-tree/mdast
 */
function customClasses ({ blockName }) {
  return function transformer (tree) {
    visit(tree, 'paragraph', node => {
      node.data = {
        hProperties: { className: `${ blockName }__paragraph` }
      }
    })

    visit(tree, 'heading', node => {
      if (node.depth === 2) {
        node.data = {
          hProperties: { className: `${ blockName }__section-title` }
        }
      }
    })

    visit(tree, 'list', node => {
      const className = node.ordered
        ? `${ blockName }__ordered-list`
        : `${ blockName }__unordered-list`

      node.data = {
        hProperties: { className }
      }
    })

    visit(tree, 'listItem', node => {
      node.data = {
        hProperties: { className: `${ blockName }__list-item` }
      }
    })

    visit(tree, 'link', node => {
      node.data = {
        hName: 'blog-link'
      }
    })

    visit(tree, 'inlineCode', node => {
      node.data = {
        hName: 'inline-code-block'
      }
    })
  }
}

/**
 * Renders markdown file and returns resulting
 * html along with metadata object parsed from
 * front matter YAML
 * @param {string} path — path to a markdown file to render
 * @param {object} [options]
 * @param {array} [options.customElementsList] — list of custom elements
 *    which may appear in the markdown file, needed for remark parser
 *    to handle multiline block elements correctly
 *    https://github.com/remarkjs/remark/tree/master/packages/remark-parse#optionsblocks
 * @param {string} [options.blockName] — prefix for custom class names in
 *    rendered html
 * @returns {{html, metadata}}
 */
function renderMarkdown (path, options = {}) {
  const md = fs.readFileSync(path, 'utf8')

  const content = frontMatter(md)
  const metadata = content.attributes

  let html

  unified()
    .use(remarkParse, { blocks: options.customElementsList || [] })
    .use(customClasses, { blockName: options.blockName || '' })
    .use(remarkHtml)
    .process(content.body, function (err, file) {
      if (err) {
        console.error(err)
      }

      html = file.toString()
    })

  return { html, metadata }
}

module.exports = renderMarkdown
