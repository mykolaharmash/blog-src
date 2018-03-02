const fs = require('fs')
const path = require('path')

const { articlesDir, blogUrl, articlesUrl } = require('../../config')
const renderMarkdown = require('../../helpers/render-markdown')
const renderTemplate = require('../../helpers/render-template')
const renderStylesLink = require('../../helpers/render-styles-link')
const ArticleImage = require('../article-image/article-image.component')
const CodeBlock = require('../code-block/code-block.component')
const InlineCodeBlock = require('../inline-code-block/inline-code-block.component')
const Link = require('../link/link.component')

const ROOT_TEMPLATE = fs.readFileSync(path.resolve(__dirname, './article-body.component.html'), 'utf8')

class ArticleBody {
  static get componentsMap () {
    return {
      'article-image': ArticleImage,
      'code-block': CodeBlock,
      'inline-code-block': InlineCodeBlock,
      'blog-link': Link
    }
  }

  static get styles () {
    return renderStylesLink('components/article-body/article-body.component.css')
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
        blockName: 'article-body',
        customElementsList: Object.keys(ArticleBody.componentsMap)
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

    const articleUrl = `${ blogUrl }${ articlesUrl }/${ id }`
    const body = renderTemplate(article.html, { articleUrl })
    const articleSpecificStyles = this.renderArticleSpecificStyles(
      article.metadata.articleStyles
    )
    const templateData = Object.assign(
      { body, articleSpecificStyles },
      article.metadata
    )

    return renderTemplate(
      ROOT_TEMPLATE,
      templateData,
      ArticleBody.componentsMap
    )
  }
}

module.exports = ArticleBody
