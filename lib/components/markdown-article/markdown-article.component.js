const fs = require('fs')
const path = require('path')

const {
  articlesDir,
  blogUrl,
  articlesUrl
} = require('../../config')
const renderMarkdown = require('../../helpers/render-markdown')
const renderTemplate = require('../../helpers/render-template')
const renderStylesLink = require('../../helpers/render-styles-link')
const ArticleImage = require('../article-image/article-image.component')
const CodeBlock = require('../code-block/code-block.component')
const InlineCodeBlock = require('../inline-code-block/inline-code-block.component')
const Link = require('../link/link.component')

const ARTICLE_TEMPLATE = fs.readFileSync(path.join(__dirname, './markdown-article.component.html'), 'utf8')

class MarkdownArticle {
  static get componentsMap () {
    return {
      'article-image': ArticleImage,
      'code-block': CodeBlock,
      'inline-code-block': InlineCodeBlock,
      'blog-link': Link
    }
  }

  static get styles () {
    return renderStylesLink('components/markdown-article/markdown-article.component.css')
  }

  renderArticleSpecificStyles (styles = []) {
    return styles
      .map(stylesUrl => renderStylesLink(stylesUrl))
      .join('')
  }

  render (attrs) {
    const id = attrs['id']

    if (id === undefined) {
      throw new Error(
        'No "id" attribute was provided'
      )
    }

    const mdPath = `${ articlesDir }/${ id }/${ id }.md`
    const article = renderMarkdown(
      mdPath,
      {
        blockName: 'article',
        customElementsList: Object.keys(MarkdownArticle.componentsMap)
      }
    )

    if (
      article.metadata.title === undefined ||
      article.metadata.publishDate === undefined
    ) {
      console.log(
        `Article ${ mdPath } is missing some metadata.\n` +
        'It should have "title" and "publishDate" properties.'
      )
    }

    const articleSpecificStyles = this.renderArticleSpecificStyles(
      article.metadata.articleStyles
    )
    const articleUrl = `${ blogUrl }${ articlesUrl }/${ id }`

    const templateData = Object.assign({
      body: article.html,
      articleSpecificStyles,
      articleUrl
    }, article.metadata)

    return renderTemplate(
      ARTICLE_TEMPLATE,
      templateData,
      MarkdownArticle.componentsMap
    )
  }
}

module.exports = MarkdownArticle
