let codeHighlight = require('../code-highlight/code-highlight.component')

function renderAddedBlock (codeString, lang) {
  return `<div class="code-block__added-line"><div class="code-block__lines-block">${ 
    codeHighlight({ codeString, lang }) 
  }</div></div>`
}

function renderNormalBlock (codeString, lang) {
  return `<div class="code-block__lines-block">${ 
    codeHighlight({ codeString, lang }) 
  }</div>`
}

function renderBlock (codeString, lang, style) {
  if (style === 'add') {
    return renderAddedBlock(codeString, lang)
  }

  return renderNormalBlock(codeString, lang)
}

module.exports = function codeBlockTemplate ({ codeStructure, lang }) {
  let blocks = codeStructure.reduce((result, block) => {
    result += renderBlock(block.code, lang, block.style)

    return result
  }, '')

  return `
    <div class="code-block__code">
      <pre><code>${ blocks }</code></pre>
    </div>
  `
}
