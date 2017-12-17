const fs = require('fs-extra')
const showdown = require('showdown')
const converter = new showdown.Converter({
  simpleLineBreaks: true
})

const config = require('../../../config')
const renderTemplate = require('../../utils/render-template')
const Component = require('../../utils/base-component')

class BlogArticle extends Component {
  static get componentName() {
    return 'blog-article'
  }
  static get componentDir() {
    return __dirname
  }

  findArticleId (attributes) {
    const idAttribute = attributes.find((item) => {
      return item.key.content === 'article-id'
    })

    return idAttribute.value.content
  }

  readMetadata (articleId) {
    const path = `${ config.articlesDir }/${ articleId }/${ articleId }.json`

    if (!fs.existsSync(path)) {
      console.log(
        `Article "${ articleId }" does not have json file with ` +
        'article metadata, it won\'t be rendered'
      )

      return
    }

    return fs.readJsonSync(path)
  }

  renderMdFile (articleId) {
    const path = `${ config.articlesDir }/${ articleId }/${ articleId }.md`

    if (!fs.existsSync(path)) {
      console.log(
        `Article "${ articleId }" does not have markdown file with ` +
        'article body, it won\'t be rendered'
      )

      return
    }

    const md = fs.readFileSync(path, 'utf8')

    return converter.makeHtml(md)
  }

  render (attributes) {
    const articleId = this.findArticleId(attributes)
    const articleBody = this.renderMdFile(articleId)
    const articleMetadata = this.readMetadata(articleId)

    if (!articleBody || !articleMetadata) {
      return []
    }

    const stylesUrl = this.generateStylesUrl('blog-article')
    const template = this.readTemplate('blog-article')
    const html = renderTemplate(template, Object.assign({
      body: articleBody,
      stylesUrl
    }, articleMetadata))

    return this.expandChildren(html)
  }
}

module.exports = BlogArticle
