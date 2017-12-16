const renderTemplate = require('../../utils/render-template')
const Component = require('../../utils/base-component')

class BlogHeader extends Component {
  static get componentName() {
    return 'blog-header'
  }
  static get componentDir() {
    return __dirname
  }

  render () {
    const stylesUrl = this.generateStylesUrl('blog-header')
    const template = this.readTemplate('blog-header')
    const html = renderTemplate(template, { stylesUrl })

    return this.expandChildren(html)
  }
}

module.exports = BlogHeader
