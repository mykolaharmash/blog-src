const fs = require('fs')
const path = require('path')

const renderTemplate = require('../../helpers/render-template')
const renderStylesLink = require('../../helpers/render-styles-link')

const TEMPLATE = fs.readFileSync(path.resolve(__dirname, './inline-code-block.component.html'), 'utf8')

class InlineCodeBlock {
  static get styles () {
    return renderStylesLink('components/inline-code-block/inline-code-block.component.css')
  }

  render (attrs, innerHtml) {
    return renderTemplate(TEMPLATE, {
      code: innerHtml
    })
  }
}

module.exports = InlineCodeBlock
