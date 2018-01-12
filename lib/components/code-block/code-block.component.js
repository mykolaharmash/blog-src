const fs = require('fs')
const path = require('path')
const highlight = require('highlight.js')
const { renderTemplate } = require('teig')

const { assetsPublicUrl } = require('../../../config')

const CODE_BLOCK_TEMPLATE = fs.readFileSync(path.join(__dirname, './code-block.component.html'), 'utf8')
const LINE_TEMPLATE = fs.readFileSync(path.join(__dirname, './line.html'), 'utf8')
const HIGHLIGHTED_LINE_TEMPLATE = fs.readFileSync(path.join(__dirname, './highlighted-line.html'), 'utf8')
const STYLES_TEMPLATE = fs.readFileSync(path.join(__dirname, './styles.html'), 'utf8')
const HIGHLIGHT_LINES_ATTR = 'highlight-lines'

class CodeBlock {
  static get styles () {
    const stylesUrl = `${ assetsPublicUrl }/components/code-block/code-block.component.css`

    return renderTemplate(STYLES_TEMPLATE, { stylesUrl })
  }

  parseHighlightLinesNumbers (attr) {
    if (attr === undefined) {
      return []
    }

    try {
      return JSON.parse(attr)
    } catch (e) {
      console.error(
        `Could not parse numbers array from "${ HIGHLIGHT_LINES_ATTR }"` +
        'attribute'
      )

      return []
    }
  }

  highlightLines (code, lineNumbers = []) {
    return code
      .split('\n')
      .map((line, index) => {
        if (lineNumbers.includes(index + 1)) {
          return renderTemplate(HIGHLIGHTED_LINE_TEMPLATE, { line }).trim()
        }

        return renderTemplate(LINE_TEMPLATE, { line }).trim()
      })
      .join('\n')
  }

  render (attrs, children) {
    const lang = attrs['lang']

    if (lang === undefined) {
      throw new Error('No "lang" attribute was provided')
    }

    const code = highlight.highlight(lang, children).value.trim()
    const highlightLinesNumbers = this.parseHighlightLinesNumbers(
      attrs[HIGHLIGHT_LINES_ATTR]
    )
    const highlightedCode = this.highlightLines(code, highlightLinesNumbers)

    return renderTemplate(CODE_BLOCK_TEMPLATE, { code: highlightedCode })
  }
}

module.exports = CodeBlock
